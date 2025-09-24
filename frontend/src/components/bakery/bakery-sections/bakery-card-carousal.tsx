import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BakeryCard from "./bakery-card";

import { type CardImagesType } from "@/types/card-images-types";


interface BakeryCardProps {
  products: CardImagesType[]
}

export default function BakeryCardCarousal({ products }: BakeryCardProps) {

  return (
    <div className="w-full px-4 py-8 h-auto">
      <div className="relative max-w-7xl mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4 sm:-ml-2">
            {products.map((product) => {
              return (
                <CarouselItem
                  key={product.public_id}
                  className="pl-4 sm:pl-2 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 mb-2"
                >
                  <BakeryCard {...product} />

                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md  hover:bg-black" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/80 backdrop-blur-md  hover:bg-black" />
        </Carousel>
   
        <div className="flex justify-center mt-6 sm:hidden">
          <p className="text-sm text-gray-500">← Swipe to see more bakery items →</p>
        </div>
      </div>
    </div>
  );
}