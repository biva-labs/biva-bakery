
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCard from "./RoomCard";
import { ScrollArea } from "./ui/scroll-area";


export default function RoomCardCarousel({ rooms }) {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-4"> {/* Adds spacing from all sides */}
      <Carousel className="relative w-full">
        <ScrollArea>
          <CarouselContent>
            {rooms.map((room, i) => (
              <CarouselItem
                key={i}
                className="basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="p-1 h-full flex items-stretch">
                  <RoomCard {...room} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </ScrollArea>

        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black" />
      </Carousel>
    </div>
  );
}


