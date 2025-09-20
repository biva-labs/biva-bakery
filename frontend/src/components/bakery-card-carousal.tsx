import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type BakeryImagesType } from "@/pages/bakery";
import { useState } from "react";

interface BakeryCardProps {
  products: BakeryImagesType[]
}

export default function BakeryCard({ products }: BakeryCardProps) {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const toggleExpanded = (publicId: string) => {
    setExpandedCards(prev => 
      prev.includes(publicId) 
        ? prev.filter(id => id !== publicId)
        : [...prev, publicId]
    );
  };

  return (
    <div className="w-full px-4 py-8 h-auto">
      <div className="relative max-w-7xl mx-auto">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4 sm:-ml-2">
            {products.map((product) => {
              const isExpanded = expandedCards.includes(product.public_id);
              return (
                <CarouselItem
                  key={product.public_id}
                  className="pl-4 sm:pl-2 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 mb-2"
                >
                  <div className="h-full rounded-xl overflow-hidden bg-white shadow-md">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col h-full">
                      <img
                        src={product.url}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-5 flex flex-col justify-between flex-grow min-h-[160px]">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-[#002a3a] mb-2">
                            {product.title}
                          </h3>
                          <div className="text-gray-600 text-sm">
                            <p className={isExpanded ? "" : "line-clamp-1"}>
                              {product.desc}
                            </p>
                            {product.desc.length > 50 && (
                              <button
                                onClick={() => toggleExpanded(product.public_id)}
                                className="text-blue-600 text-xs mt-1 hover:underline"
                              >
                                {isExpanded ? "Show less" : "See details"}
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                          <button className="text-white px-4 py-2 rounded-lg nexa bg-[#DE4243] flex items-center gap-2">
                            <svg 
                              width="20" 
                              height="20" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-green-400"
                            >
                              <path 
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.595" 
                                fill="#ffffffff"
                              />
                            </svg>
                            Order Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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