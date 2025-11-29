import { useState, useMemo, useCallback, memo } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Form from "./form";
import PayButton from "../pay-button";
import Amenities from "../amenities";
import { useHotelForm } from "@/hooks/useHotelForm";
import usePay from "@/hooks/usePay";
import { toast } from "sonner";
import { useHotelStore } from "@/store/hotel-store";

interface RoomBookingPageProps {
    url: string | string[];
    type: string;
    price: string;
}

export const RoomBookingPage = memo(function RoomBookingPage({
    url,
    type,
    price,
}: RoomBookingPageProps) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Memoize images array to prevent recreation on every render
    const images = useMemo(() => {
        return Array.isArray(url) ? url : [url];
    }, [url]);

    // Memoize the first 3 images for the preview
    const previewImages = useMemo(() => {
        return images.slice(0, 3);
    }, [images]);

    // Memoize callback functions to prevent child re-renders
    const handleGalleryOpen = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setGalleryOpen(true);
    }, []);

    const handleImageSelect = useCallback((index: number) => {
        setSelectedImageIndex(index);
    }, []);

    const handleBookingOpenChange = useCallback((open: boolean) => {
        setBookingOpen(open);
    }, []);

    const handleGalleryOpenChange = useCallback((open: boolean) => {
        setGalleryOpen(open);
    }, []);

    // Memoize the selected image to prevent lookups
    const selectedImage = useMemo(() => {
        return images[selectedImageIndex];
    }, [images, selectedImageIndex]);

    const data = useHotelStore();
    const { mutate: submitForm, isPending, isError, error } = useHotelForm();

    const { initiatePayment, isProcessing } = usePay();

    const handleBookAndPay = async () => {
        // if (data) {
        //     console.log(data);
        //     return;
        // }

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
                type: type,
            },
            {
                onSuccess: async (response) => {
                    console.log(response.data.data);
                    const totalAmount = response.data?.data[0]?.totalAmount;
                    console.log(totalAmount);
                    const user = response.data?.data?.map((v) => v.id);
                    console.log(user);
                    await initiatePayment(totalAmount, user, "hotel");
                },
                onError: (error) => {
                    console.error("Form submission error:", error);
                    toast.error("Form submission failed. Please try again.");
                },
            },
        );
    };

    return (
        <>
            <Dialog open={bookingOpen} onOpenChange={handleBookingOpenChange}>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="rounded-full px-4 py-2 nexa bg-[#002a3a] text-white hover:bg-[#002a3a] "
                        size="sm"
                    >
                        Book
                    </Button>
                </DialogTrigger>

                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold">
                            Room Booking
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col lg:flex-row gap-10 mt-6">
                        <div className="lg:w-1/2 relative group">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
                                {/* Show stacked images; use CSS for hover effect */}
                                {previewImages.map((img, index) => (
                                    <img
                                        key={`preview-${index}`}
                                        src={img}
                                        alt={`Room image ${index + 1}`}
                                        className={`
                                            absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-out
                                            ${
                                                index === 0
                                                    ? "group-hover:scale-[0.95] group-hover:-translate-x-[15px] group-hover:-translate-y-[10px] group-hover:-rotate-3"
                                                    : index === 1
                                                      ? "group-hover:scale-[0.95] group-hover:opacity-100"
                                                      : "group-hover:scale-[0.95] group-hover:translate-x-[15px] group-hover:translate-y-[10px] group-hover:rotate-3"
                                            }
                                        `}
                                        style={{
                                            zIndex: 10 - index,
                                            opacity: index === 0 ? 1 : 0,
                                        }}
                                    />
                                ))}

                                <button
                                    type="button"
                                    onClick={handleGalleryOpen}
                                    className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-all duration-200 font-medium z-20"
                                >
                                    View More +
                                </button>
                            </div>

                            <Amenities />
                        </div>

                        <div className="lg:w-1/2 space-y-6">
                            <Form type={type} />
                            <Separator />
                            <Button
                                onClick={handleBookAndPay}
                                disabled={isPending || isProcessing}
                                className="w-full"
                            >
                                {isPending || isProcessing
                                    ? "Processing..."
                                    : (() => {
                                          const guests = parseInt(
                                              data.total_people,
                                          );
                                          const priceInt = parseInt(price);

                                          if (isNaN(guests) || guests <= 0)
                                              return "Pay Now";

                                          const total = guests * priceInt;

                                          return `Pay Now ₹${total}`;
                                      })()}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={galleryOpen} onOpenChange={handleGalleryOpenChange}>
                <DialogContent className="max-w-screen max-h-screen overflow-hidden rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Room Image Gallery</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[80vh]">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {images.map((img, index) => (
                                <div
                                    key={`gallery-${index}`}
                                    className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                                        selectedImageIndex === index
                                            ? "ring-2 ring-blue-500"
                                            : ""
                                    }`}
                                    onClick={() => handleImageSelect(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Room image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <img
                                src={selectedImage}
                                alt="Selected room"
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
        </>
    );
});
