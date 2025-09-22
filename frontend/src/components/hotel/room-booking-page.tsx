import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SeatForm from "../seat-form";
import { useParams } from "react-router-dom";
import PayButton from "../pay-button";
import Amenities from "../amenities";

export default function RoomBookingPage() {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Demo images - using same image for now
  const images = [
    "/room.jpg",
    "/room.jpg", 
    "/room.jpg",
    "/room.jpg",
    "/room.jpg",
    "/room.jpg"
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Book Your {id?.[0] === "H" ? (
        <>Room</>
      ) : id?.[0] === "E" ? (
        <>Ticket</>
      ) : (
        <>Table</>
      )}
      </h1>

      {id ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE: Image Gallery with Hover Animation */}
          <div className="lg:w-1/2">
            <div 
              className="relative h-64 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Base container that maintains layout */}
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                {/* Main image - always visible */}
                <div className="absolute inset-0 z-10">
                  <img
                    src={images[0]}
                    alt={`Seat ${id}`}
                    className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-out"
                    style={{
                      transform: isHovered ? 'scale(0.95) translateX(-15px) translateY(-10px) rotate(-3deg)' : 'scale(1) translateX(0) translateY(0) rotate(0deg)'
                    }}
                  />
                </div>

                {/* Second card - appears on hover */}
                <div 
                  className="absolute inset-0 z-8 transition-all duration-700 ease-out"
                  style={{
                    transform: isHovered ? 'scale(0.95) translateX(0px) translateY(0px) rotate(0deg)' : 'scale(1) translateX(0px) translateY(0px) rotate(0deg)',
                    opacity: isHovered ? 1 : 0
                  }}
                >
                  <img
                    src={images[1]}
                    alt={`Seat ${id} - Image 2`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Third card - appears on hover with delay */}
                <div 
                  className="absolute inset-0 z-6 transition-all duration-900 ease-out"
                  style={{
                    transform: isHovered ? 'scale(0.95) translateX(15px) translateY(10px) rotate(3deg)' : 'scale(1) translateX(0px) translateY(0px) rotate(0deg)',
                    opacity: isHovered ? 1 : 0
                  }}
                >
                  <img
                    src={images[2]}
                    alt={`Seat ${id} - Image 3`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* View More Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-all duration-200 font-medium z-20">
                    view more +
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Seat {id} - Image Gallery</DialogTitle>
                  </DialogHeader>
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-h-96 overflow-y-auto">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                          selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img
                          src={img}
                          alt={`Seat ${id} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected Image Display */}
                  <div className="mt-6">
                    <img
                      src={images[selectedImageIndex]}
                      alt={`Seat ${id} - Selected`}
                      className="w-full max-h-80 object-cover rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-1 mt-6">
              <h2 className="text-xl font-semibold">Seat {id}</h2>
              <p className="text-sm text-muted-foreground">Table: Round Table 5</p>
              <p className="text-sm text-green-600 font-medium">Status: Available</p>
            </div>

                  <Amenities/>
          </div>

          {/* RIGHT SIDE: Form + Button */}
          <div className="lg:w-1/2 space-y-6">
            <SeatForm table={id || ""} />
            <Separator />
            <PayButton amount={10000} />
          </div>
        </div>
      ) : (
        <p className="text-red-500">Invalid seat ID.</p>
      )}
    </div>
  );
}
