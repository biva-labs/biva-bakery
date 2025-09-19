import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SeatForm from "./seat-form";
import { useParams } from "react-router-dom";
import PayButton from "./pay-button";

export default function SeatBookingPage() {
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

            {/* Amenities Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Row 1 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Complimentary Wi-Fi Services</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Drinking Water</span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Housekeeping Services</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">In room Dining Service</span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Centralized Air Conditioning</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Closet</span>
                </div>

                {/* Row 4 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 line-through">Minibar</span>
                    <span className="text-xs text-red-500">Not Available</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Iron / Iron Board on Request</span>
                </div>

                {/* Row 5 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Intercom</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Tea / Coffee Kettle</span>
                </div>

                {/* Row 6 */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 line-through">Safe Deposit Locker</span>
                    <span className="text-xs text-red-500">Not Available</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">43" Inch HD Smart TV</span>
                </div>
              </div>
            </div>
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
