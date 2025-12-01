import { useState, useMemo, useCallback, memo } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
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
    // 1️⃣ URL → Determine Room Type
    const location = useLocation();
    const pathname = location.pathname.toLowerCase();
    const roomType = pathname.replace("/booking/", "").trim();

    // 2️⃣ Get Room Card Data from Zustand
    const cardData = useRoomStore((s) => s.rooms[roomType]);

    if (!cardData) {
        return (
            <p className="text-red-500 text-center mt-10">Invalid Room Type</p>
        );
    }

    const { url, price, room_type } = cardData;

    // 3️⃣ Local UI States
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // 4️⃣ Prepare Image List
    const images = useMemo(() => (Array.isArray(url) ? url : [url]), [url]);
    const selectedImage = images[selectedImageIndex];

    // 5️⃣ Zustand Form Data
    const data = useHotelStore();

    // 6️⃣ Form & Payment Hooks
    const { mutate: submitForm, isPending } = useHotelForm();
    const { initiatePayment, isProcessing } = usePay();

    // 7️⃣ Button Text Memo
    const buttonText = useMemo(() => {
        if (isPending || isProcessing) return "Processing...";

        const guests = parseInt(data.total_people);
        const priceInt = parseInt(price);
        const rooms = parseInt(data.total_rooms);
        const days = parseInt(data.total_days);

        if ([guests, priceInt, rooms, days].some(isNaN)) {
            return "Pay Now";
        }

        const totalAmount = rooms * priceInt * days;
        return `Pay Now ₹${totalAmount}`;
    }, [
        isPending,
        isProcessing,
        data.total_people,
        data.total_rooms,
        data.total_days,
        price,
    ]);

    // 8️⃣ Book & Pay Handler
    const handleBookAndPay = useCallback(() => {
        if (
            !data.name ||
            !data.email ||
            !data.phone_number ||
            !data.join_date ||
            !data.leave_date ||
            !data.total_people
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!data.adhaar_or_pan_card) {
            toast.error("Please upload your Aadhar or PAN card");
            return;
        }

        submitForm(
            {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                adhaar_or_pan_card: data.adhaar_or_pan_card,
                total_people: data.total_people,
                join_date: data.join_date,
                leave_date: data.leave_date,
                type: room_type,
                total_days: data.total_days,
                total_rooms: data.total_rooms,
            },
            {
                onSuccess: async (response) => {
                    const amount = response.data?.total_amount;
                    const id = response.data?.reservation_id;
                    if (amount && id) {
                        await initiatePayment(amount, id, "hotel");
                    } else {
                        toast.error("Invalid server response");
                    }
                },
                onError: () => toast.error("Booking failed"),
            },
        );
    }, [data, room_type]);

    // 9️⃣ Handlers
    const handleImageSelect = (i: number) => setSelectedImageIndex(i);
    const openGallery = () => setGalleryOpen(true);

    return (
        <>
            {/* ---------- IMAGES + THUMBNAILS ---------- */}
            <div className="flex flex-col space-y-4">
                <img
                    src={selectedImage}
                    className="w-full h-72 object-cover rounded-xl cursor-pointer"
                    onClick={openGallery}
                    alt={roomType}
                />

                <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            onClick={() => handleImageSelect(i)}
                            className={`w-20 h-20 object-cover rounded-md cursor-pointer border
                                ${i === selectedImageIndex ? "border-black" : "border-transparent"}`}
                            alt={roomType + i}
                        />
                    ))}
                </div>

                <Amenities />
            </div>

            {/* ---------- FULL SCREEN GALLERY ---------- */}
            <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
                <DialogContent className="max-w-screen max-h-screen rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Room Images</DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="h-[80vh]">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer
                                    ${selectedImageIndex === index ? "ring-2 ring-blue-500" : ""}`}
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <img
                                src={selectedImage}
                                className="w-full max-h-[70vh] object-cover rounded-lg"
                            />
                        </div>
                    </ScrollArea>

                    <DialogClose asChild>
                        <Button variant="outline" className="mt-4">
                            Close
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            {/* ---------- BOOKING FORM ---------- */}
            <div className="lg:w-1/2 space-y-6 mt-6">
                <h2 className="text-xl font-semibold">Book {roomType} Room</h2>

                <Form type={room_type} />

                <Separator />

                <Button
                    onClick={handleBookAndPay}
                    disabled={isPending || isProcessing}
                    className="w-full"
                >
                    {buttonText}
                </Button>
            </div>
        </>
    );
});
