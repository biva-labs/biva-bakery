
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomCard from "./RoomCard";

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
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
          <div className="w-8 h-px bg-green-600"></div>
          <span>ACCOMMODATION</span>
          <div className="w-8 h-px bg-green-600"></div>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Luxury Rooms & Suites
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience unparalleled comfort and elegance in our meticulously designed rooms
        </p>
      </div>

      {/* Carousel Container */}
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

          {/* Enhanced Navigation Buttons */}
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-black hover:shadow-xl  hidden sm:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/90 backdrop-blur-sm shadow-lg border border-gray-200 hover:bg-black hover:shadow-xlhidden sm:flex" />
        </Carousel>

        {/* Mobile Navigation Hint */}
        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more rooms →</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{rooms.length}+</div>
          <div className="text-gray-600 text-sm">Room Types</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">24/7</div>
          <div className="text-gray-600 text-sm">Room Service</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">4.8★</div>
          <div className="text-gray-600 text-sm">Guest Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-gray-600 text-sm">Satisfaction</div>
        </div>
      </div>
    </div>
  );
}


