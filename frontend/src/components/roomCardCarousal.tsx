import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCard from "./roomCard";

interface Room {
  imgurl: string;
  title: string;
  desc: string;
  onAction: () => void;
}

interface RoomCardCarouselProps {
  rooms: Room[];
}

export default function RoomCardCarousel({ rooms }: RoomCardCarouselProps) {
  return (
    <div className="w-full px-4 py-8">
      <div className="relative max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 sm:-ml-2">
            {rooms.map((room, index) => (
              <CarouselItem
                key={index}
                className="pl-4 sm:pl-2 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full shadow-lg rounded-xl overflow-hidden bg-white">
                  <RoomCard {...room} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows always visible now */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md shadow-md border border-gray-200 hover:bg-black" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md shadow-md border border-gray-200 hover:bg-black" />
        </Carousel>

        {/* Optional: Keep the swipe hint on mobile */}
        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more rooms →</p>
        </div>
      </div>
    </div>
  );
}
