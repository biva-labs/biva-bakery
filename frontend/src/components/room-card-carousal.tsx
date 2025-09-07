import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCard from "./room-card";
import { useNavigate } from "react-router-dom";

export interface Room {
  public_id: string;
  url: string | undefined;
  tag: string | undefined;
  desc: string | undefined;
  onAction: () => void | Promise<void>;
}

interface RoomCardCarouselProps {
  rooms: Room[];
}

export default function RoomCardCarousel({ rooms }: RoomCardCarouselProps) {

  const navigate = useNavigate()


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
            {rooms.map((room) => (
              <CarouselItem
                key={room.public_id}
                className="pl-4 sm:pl-2 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="h-full  rounded-xl overflow-hidden bg-white">
                  <RoomCard
                    url={room.url}
                    title={room.tag}
                    desc=""
                    onAction={() => room.tag ? navigate("/test/H11") : navigate("/test")}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md  border border-gray-200 hover:bg-black" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md border border-gray-200 hover:bg-black" />
        </Carousel>

        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more rooms →</p>
        </div>
      </div>
    </div>
  );
}
