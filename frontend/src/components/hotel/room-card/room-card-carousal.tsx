import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { groupByTag } from "@/utils/group-by-tag";
import RoomCard from "./room-card";
import { type CardImagesType } from "@/types/card-images-types";

interface RoomCardCarouselProps {
  rooms: CardImagesType[];
}

export default function RoomCardCarousel({ rooms }: RoomCardCarouselProps) {
  const navigate = useNavigate();

  const roomTypes = groupByTag(rooms);

  return (
    <div className="w-full px-4 py-8">
      <div className="relative max-w-7xl mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4 sm:-ml-2">
            {Object.keys(roomTypes).map((roomType) => {
              const room = roomTypes[roomType];
              const { desc, price, url, public_id } = room;

              return (
                <CarouselItem
                  key={public_id || roomType}
                  className="pl-4 sm:pl-2 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="h-full rounded-xl overflow-hidden bg-white shadow-md">
                    <RoomCard
                      tag={roomType}
                      title={roomType}
                      public_id={public_id || roomType}
                      url={Array.isArray(url) ? url : [url]}
                      desc={desc}
                      price={price}
                      onAction={() => navigate(`/test/${roomType}`)}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md border border-gray-200 hover:bg-black" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md border border-gray-200 hover:bg-black" />
        </Carousel>

        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more rooms →</p>
        </div>
      </div>
    </div>
  );
}
