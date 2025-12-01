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

  // Memoize images array to prevent recreation on every render if `url` prop is a new array instance.
  const images = useMemo(() => {
    return Array.isArray(url) ? url : [url];
  }, [url]);

  // Memoize callback functions to prevent child re-renders.
  const handleBookingOpenChange = useCallback((open: boolean) => {
    setBookingOpen(open);
  }, []);

  const handleGalleryOpenChange = useCallback((open: boolean) => {
    setGalleryOpen(open);
  }, []);

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  // Memoize the selected image to prevent lookups on every render.
  const selectedImage = useMemo(() => {
    return images[selectedImageIndex];
  }, [images, selectedImageIndex]);

  const data = useHotelStore();
  const { mutate: submitForm, isPending } = useHotelForm();
  const { initiatePayment, isProcessing } = usePay();

  // Memoize the button text to avoid re-calculating on every render.
  const buttonText = useMemo(() => {
    if (isPending || isProcessing) {
      return "Processing...";
    }

    const guests = parseInt(data.total_people);
    const priceInt = parseInt(price);

    // Basic validation to prevent NaN calculations
    if (isNaN(guests) || guests <= 0 || isNaN(priceInt)) {
      return "Pay Now";
    }

    const totalRooms = parseInt(data.total_rooms);
    const totalDays = parseInt(data.total_days);

    if (isNaN(totalRooms) || isNaN(totalDays)) {
      return "Pay Now";
    }

    const totalAmount = totalRooms * priceInt * totalDays;
    return `Pay Now ₹${totalAmount}`;
  }, [
    isPending,
    isProcessing,
    data.total_people,
    data.total_rooms,
    data.total_days,
    price,
  ]);

  const handleBookAndPay = async () => {
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
        total_days: data.total_days,
        total_rooms: data.total_rooms,
      },
      {
        onSuccess: async (response) => {
          const totalAmount = response.data?.total_amount;
          const id = response.data?.reservation_id;
          if (totalAmount && id) {
            await initiatePayment(totalAmount, id, "hotel");
          } else {
            toast.error("Invalid response from server. Please try again.");
          }
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
            <div className="lg:w-1/2">
              {/* --- SIMPLIFIED IMAGE PREVIEW --- */}
              {/* Removed complex animations for minimalism and performance. */}
              <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-xl">
                <img
                  src={images[0]} // Only show the first image
                  alt="Room preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)} // Directly set state
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
                {/* --- USE MEMOIZED BUTTON TEXT --- */}
                {buttonText}
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
                    selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
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
