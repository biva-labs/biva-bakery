// import { Separator } from "@/components/ui/separator";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogDescription,
//   DialogFooter,
//   DialogClose
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import SeatForm from "../seat-form";
// import { useParams } from "react-router-dom";
// import PayButton from "../pay-button";
// import Amenities from "../amenities";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";

// export default function RoomBookingPage() {
//   const { id } = useParams();
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);


//   const images = [
//     "/room-2.png",
//     "/room-1.png",
//     "/room-3.png",
//     "/room-4.png",
//     // "/room.jpg",
//     // "/room.jpg"
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       <h1 className="text-2xl font-bold mb-6">Book Your {id?.[0] === "H" ? (
//         <>Room</>
//       ) : id?.[0] === "E" ? (
//         <>Ticket</>
//       ) : (
//         <>Table</>
//       )}
//       </h1>

//       {id ? (
//         <div className="flex flex-col lg:flex-row gap-8">

//           <div className="lg:w-1/2">
//             <div
//               className="relative h-64 cursor-pointer"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Base container that maintains layout */}
//               <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
//                 {/* Main image - always visible */}
//                 <div className="absolute inset-0 z-10">
//                   <img
//                     src={images[0]}
//                     alt={`Seat ${id}`}
//                     className="w-full h-full object-cover rounded-lg transition-all duration-500 ease-out"
//                     style={{
//                       transform: isHovered ? 'scale(0.95) translateX(-15px) translateY(-10px) rotate(-3deg)' : 'scale(1) translateX(0) translateY(0) rotate(0deg)'
//                     }}
//                   />
//                 </div>

//                 {/* Second card - appears on hover */}
//                 <div
//                   className="absolute inset-0 z-8 transition-all duration-700 ease-out"
//                   style={{
//                     transform: isHovered ? 'scale(0.95) translateX(0px) translateY(0px) rotate(0deg)' : 'scale(1) translateX(0px) translateY(0px) rotate(0deg)',
//                     opacity: isHovered ? 1 : 0
//                   }}
//                 >
//                   <img
//                     src={images[1]}
//                     alt={`Seat ${id} - Image 2`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>


//                 <div
//                   className="absolute inset-0 z-6 transition-all duration-900 ease-out"
//                   style={{
//                     transform: isHovered ? 'scale(0.95) translateX(15px) translateY(10px) rotate(3deg)' : 'scale(1) translateX(0px) translateY(0px) rotate(0deg)',
//                     opacity: isHovered ? 1 : 0
//                   }}
//                 >
//                   <img
//                     src={images[2]}
//                     alt={`Seat ${id} - Image 3`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               </div>

//               {/* View More Button */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <button className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-all duration-200 font-medium z-20">
//                     view more +
//                   </button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl max-h-[90vh]">
//                   <DialogHeader>
//                     <DialogTitle>Seat {id} - Image Gallery</DialogTitle>
//                   </DialogHeader>

//                   {/* Image Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 max-h-96 overflow-y-auto">
//                     {images.map((img, index) => (
//                       <div
//                         key={index}
//                         className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
//                           }`}
//                         onClick={() => setSelectedImageIndex(index)}
//                       >
//                         <img
//                           src={img}
//                           alt={`Seat ${id} - Image ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>

//                   {/* Selected Image Display */}
//                   <div className="mt-6">
//                     <img
//                       src={images[selectedImageIndex]}
//                       alt={`Seat ${id} - Selected`}
//                       className="w-full max-h-80 object-cover rounded-lg"
//                     />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <div className="space-y-1 mt-6">
//               <h2 className="text-xl font-semibold">Seat {id}</h2>
//               <p className="text-sm text-muted-foreground">Table: Round Table 5</p>
//               <p className="text-sm text-green-600 font-medium">Status: Available</p>
//             </div>

//             <Amenities />
//           </div>

//           {/* RIGHT SIDE: Form + Button */}
//           <div className="lg:w-1/2 space-y-6">
//             <SeatForm table={id || ""} />
//             <Separator />
//             <PayButton amount={10000} />
//           </div>
//         </div>
//       ) : (
//         <p className="text-red-500">Invalid seat ID.</p>
//       )}
//     </div>
//   );
// }




import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SeatForm from "../seat-form";
import PayButton from "../pay-button";
import Amenities from "../amenities";
import { ScrollArea } from "../ui/scroll-area";

export function RoomBookingPage({ url }: { url: string | string[] }) {

  const [isHovered, setIsHovered] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const images = Array.isArray(url) ? url : [url];

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default" className="rounded-full px-4 py-2 nexa bg-[#002a3a] text-white hover:bg-[#002a3a] " size="sm">Book</Button>
        </DialogTrigger>

  
        <DialogContent
          className="rounded-2xl"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">Room Booking</DialogTitle>
            <DialogDescription>
              Choose your room, view images, and confirm booking.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col lg:flex-row gap-10 mt-6">
         
            <div className="lg:w-1/2 relative">
              <div
                className="relative h-80 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="w-full h-full rounded-lg overflow-hidden shadow-xl relative">
                  {images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Seat Image ${index + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-700 ease-out`}
                      style={{
                        zIndex: 10 - index,
                        opacity: index === 0 ? 1 : isHovered ? 1 : 0,
                        transform:
                          isHovered && index === 0
                            ? "scale(0.95) translateX(-15px) translateY(-10px) rotate(-3deg)"
                            : isHovered && index === 1
                              ? "scale(0.95)"
                              : isHovered && index === 2
                                ? "scale(0.95) translateX(15px) translateY(10px) rotate(3deg)"
                                : "scale(1)",
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setGalleryOpen(true)}
                  className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm hover:bg-black/90 transition-all duration-200 font-medium z-20"
                >
                  View More +
                </button>
              </div>

              <div className="space-y-1 mt-6">
                <h2 className="text-2xl font-semibold">Seat A1</h2>
                <p className="text-sm text-muted-foreground">Table: Round Table 5</p>
                <p className="text-sm text-green-600 font-medium">Status: Available</p>
              </div>

              <Amenities />
            </div>

            {/* RIGHT SIDE: Form + Payment */}
            <div className="lg:w-1/2 space-y-6">
              <SeatForm table="Round Table 5" />
              <Separator />
              <PayButton amount={10000} />
            </div>
          </div>
        </DialogContent>
      </form>

      {/* (Optional) Image Gallery */}
      {galleryOpen && (
        <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
          <DialogContent className="max-w-screen  max-h-screen overflow-y-auto rounded-2xl mr-10">
            <DialogHeader>
              <DialogTitle>Seat Image Gallery</DialogTitle>
            </DialogHeader>
          <ScrollArea>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${selectedImageIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={img}
                    alt={`Seat Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <img
                src={images[selectedImageIndex]}
                alt="Selected Seat"
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
      )}
    </Dialog>
  );
}

