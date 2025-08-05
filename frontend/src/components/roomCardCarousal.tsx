
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
          <CarouselContent className="-ml-2 md:-ml-4">
            {rooms.map((room, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="h-full">
                  <RoomCard {...room} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

 
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-black hover:shadow-xl  hidden sm:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-black hover:shadow-xlhidden sm:flex" />
        </Carousel>


        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more rooms →</p>
        </div>
      </div>



    </div>
  );
}


