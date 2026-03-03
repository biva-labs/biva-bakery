import { useState, useMemo, useCallback, memo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Form from "./form";
import Amenities from "../amenities";
import { useHotelForm } from "@/hooks/useHotelForm";
import usePay from "@/hooks/usePay";
import { toast } from "sonner";
import { useHotelStore } from "@/store/hotel-store";
import { useRoomStore } from "@/store/hotel-card-store";
import { useLocation } from "react-router-dom";

export const RoomBookingPage = memo(function RoomBookingPage() {
    const location = useLocation();
    const pathname = location.pathname.toLowerCase();
    const roomType = pathname.replace("/booking/", "").trim();

    const cardData = useRoomStore((s) => s.rooms[roomType]);

    // UI states — hooks must be called unconditionally before any early return
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const data = useHotelStore();

    const { mutate: submitForm, isPending } = useHotelForm();
    const { initiatePayment, isProcessing } = usePay();

    const url = cardData?.url;
    const price = cardData?.price ?? "0";
    const room_type = cardData?.room_type ?? "";

    const images = useMemo(
        () => (Array.isArray(url) ? url : url ? [url] : []),
        [url],
    );
    const selectedImage = images[selectedImageIndex] ?? "";

    const buttonText = useMemo(() => {
        if (isPending || isProcessing) return "Processing...";

        const guests = parseInt(data.total_people);
        const priceInt = parseInt(price);
        const rooms = parseInt(data.total_rooms);
        const days = parseInt(data.total_days);

        if ([guests, priceInt, rooms, days].some(isNaN)) {
            return "Pay Now";
        }

        return `Pay Now ₹${rooms * priceInt * days}`;
    }, [
        isPending,
        isProcessing,
        data.total_people,
        data.total_rooms,
        data.total_days,
        price,
    ]);

    const handleBookAndPay = useCallback(() => {
        if (
            !data.name ||
            !data.email ||
            !data.phone_number ||
            !data.join_date ||
            !data.leave_date ||
            !data.total_people
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        if (!data.adhaar_or_pan_card) {
            toast.error(
                "Please upload your Aadhar / Voter ID / Driving License",
            );
            return;
        }

        submitForm(
            {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                adhaar_or_pan_card: data.adhaar_or_pan_card,
                secondary_doc_card: data.secondary_doc_card,
                total_people: data.total_people,
                join_date: data.join_date,
                leave_date: data.leave_date,
                type: room_type,
                total_days: data.total_days,
                total_rooms: data.total_rooms,
            },
            {
                onSuccess: async (response) => {
                    console.log("room booking page", response);
                    const amount = response.data?.total_amount;
                    const id = response.data?.id;

                    if (amount && id) {
                        await initiatePayment(amount, [id], "hotel");
                    } else {
                        toast.error("Invalid server response");
                    }
                },
                onError: (error: Error) => {
                    const msg = error.message ?? "Booking failed";
                    toast.error(msg);
                },
            },
        );
    }, [data, room_type, submitForm, initiatePayment]);

    if (!cardData) {
        return (
            <p className="text-red-500 text-center mt-10">Invalid Room Type</p>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl mx-auto px-4">
            {/* LEFT SIDE — GALLERY */}
            <div className="lg:w-1/2 space-y-10 mt-10">
                {/* MAIN IMAGE CARD */}
                <div
                    className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                    onClick={() => setGalleryOpen(true)}
                >
                    <img
                        src={selectedImage}
                        className="w-full h-80 md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                        alt="Selected room"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Gallery
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                        {selectedImageIndex + 1} of {images.length}
                    </div>
                </div>

                {/* THUMBNAILS */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => setSelectedImageIndex(i)}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0
                                ${
                                    i === selectedImageIndex
                                        ? "border-blue-500"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            alt={`Room ${i + 1}`}
                        />
                    ))}
                </div>

                {/* AMENITIES */}
                <Amenities />

                {/* SIMPLE GALLERY MODAL */}
                <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
                    <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] p-6 m-4">
                        <DialogHeader className="mb-4">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-xl font-semibold">
                                    {roomType.charAt(0).toUpperCase() +
                                        roomType.slice(1)}{" "}
                                    Room
                                </DialogTitle>
                                {/*<DialogClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="p-2"
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </DialogClose>*/}
                            </div>
                        </DialogHeader>

                        <ScrollArea className="max-h-[70vh]">
                            <div className="space-y-6">
                                {/* CURRENT SELECTED IMAGE */}
                                <div className="w-full">
                                    <img
                                        src={selectedImage}
                                        className="w-full max-h-96 object-cover rounded-lg"
                                        alt="Selected room view"
                                    />
                                </div>

                                {/* ALL IMAGES GRID */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`rounded-lg overflow-hidden cursor-pointer border-2 transition-all
                                                ${
                                                    selectedImageIndex === i
                                                        ? "border-blue-500"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            onClick={() =>
                                                setSelectedImageIndex(i)
                                            }
                                        >
                                            <img
                                                src={img}
                                                className="w-full h-32 object-cover"
                                                alt={`Room view ${i + 1}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>

            {/* RIGHT SIDE — FORM */}
            <div className="lg:w-1/2 space-y-6 mt-10 mb-10">
                <h2 className="text-2xl font-semibold">Book {roomType} Room</h2>

                <Form type={room_type} />

                <Separator />

                <Button
                    onClick={handleBookAndPay}
                    disabled={isPending || isProcessing}
                    className="w-full py-3 text-lg"
                >
                    {buttonText}
                </Button>

                {/* Caution Box */}
                <div className="border-2 border-red-500 rounded-lg p-5 bg-red-50 mt-6">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg
                                className="w-5 h-5 text-red-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-red-800 font-semibold text-base mb-3">
                                Important Booking Rules & Policies
                            </h4>
                            <ul className="space-y-2 text-red-700 text-sm leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        We do not accept local IDs. In case of
                                        bookings from local IDs, fees shall not
                                        be refunded.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        Unmarried couples are not allowed.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        Only proper and government authorized
                                        Aadhar Card / Voter ID / Driving License
                                        are allowed. Failure to do so will
                                        result in only 80% of fees to be
                                        refundable.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-600 font-bold mt-0.5">
                                        •
                                    </span>
                                    <span>
                                        For extra beds, please contact at the
                                        Reception.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
