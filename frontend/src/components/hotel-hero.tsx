import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
];

export default function HotelHero() {
  return (
    <div className="relative w-screen h-[40vh] lg:h-[60vh] overflow-hidden -mt-14 left-[calc(-50vw+50%)] right-[calc(-50vw+50%)] mx-auto">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="absolute inset-0 z-0"
      >
        <CarouselContent className="">
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="w-full">
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-[40vh] lg:h-[60vh] object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
        <h1 className="text-2xl outfit font-extrabold md:text-4xl lg:text-5xl text-white leading-tight">
          Experience
          <br />
          Luxury
        </h1>
        <p className="mt-2 text-xs font-light md:text-lg lg:text-xl text-gray-200 max-w-md leading-snug">
          Experience luxury and
          <br />
          comfort in the heart of the city.
        </p>
      </div>

      <div className="absolute bottom-0 right-0 p-3 md:p-10 z-20 flex flex-col items-end space-y-2">
        <div className="text-white text-sm md:text-xl">
          Available at just ₹4999/-
        </div>

        <Button variant="orange" className="hover:cursor-pointer mb-4 lg:mb-0">
          Contact Us
        </Button>
      </div>
    </div>
  );
}
