import Hero from "@/components/hero";
import { useImages } from "@/hooks/useImages";
import { useState } from "react";
import { useEffect } from "react";
import BakerySections from "@/components/bakery/bakery-sections/bakery-sections";

import { type CardImagesType } from "@/types/card-images-types";
import ProductCategoryRow from "@/components/bakery/bakery-category/product-category-row";



type GroupedBakeryData = {
  [key: string]: CardImagesType[]
}

export default function Bakery() {
  const [groupedBakeryData, setGroupedBakeryData] = useState<GroupedBakeryData>({})

  const { data, error, isLoading } = useImages("bakery");

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setGroupedBakeryData(data.data)
    }
  }, [data]);

  if (error) {
    return <div className="text-center py-10">Error loading bakery data</div>
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading bakery products...</div>
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
          Object.entries(groupedBakeryData).map(([category, items]) => (
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
