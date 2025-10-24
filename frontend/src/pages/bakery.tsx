import Hero from "@/components/hero";
import { useImages } from "@/hooks/useImages";
import { useState } from "react";
import { useEffect } from "react";
import BakerySections from "@/components/bakery/bakery-sections/bakery-sections";

import { type CardImagesType } from "@/types/card-images-types";
// import { type CardImagesType } from "@/types/card-images-types";
import { type HeroImagesType } from "@/types/hero-images-types";
import { type GalleryImagesType } from "@/types/gallery-images-types";

import ProductCategoryRow from "@/components/bakery/bakery-category/product-category-row";



type GroupedBakeryData = {
  [key: string]: CardImagesType[]
}

export default function Bakery() {
  // const [groupedBakeryData, setGroupedBakeryData] = useState<GroupedBakeryData>({});
  const [bakeryHero, setBakeryHero] = useState<HeroImagesType[]>([]);
  const [bakeryCategory, setBakeryCategory] = useState<HeroImagesType[]>([]);
  const [bakeryItems, setBakeryItems] = useState<GroupedBakeryData>({});

  const { data, error, isLoading } = useImages("bakery");

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setBakeryHero(data.data.hero)
      setBakeryItems(data.data.groupedItems)
    }
  }, [data]);

  if (error) {
    return <div className="text-center py-10">Error loading bakery data</div>
  }

  if (isLoading) {
     // do soemthing
  }

  return (
    <div className="outfit">

      <div className="mx-auto px-4 lg:mr-0">
        <Hero
          title={
            <div className="text-center ">
              Fresh from the oven, <br /> straight to your hearts
            </div>
          }
          images={bakeryHero}
        />

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl lg:text-4xl outfit text-center font-extrabold text-[#DE4243] mb-2">
            Whats on your mind?
          </h2>
          <ProductCategoryRow />
        </div>

        <div
          className="outfit w-screen bg-[#DE4243] py-2 text-center text-white -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)]">
          Order bulk for your house party
        </div>

        {
          Object.entries(bakeryItems).map(([category, items]) => (
            <BakerySections
              title={category}
              products={items}
            />
          ))
        }
      </div>
    </div>
  );
}
