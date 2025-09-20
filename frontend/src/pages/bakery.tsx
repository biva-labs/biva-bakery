import Hero from "@/components/hero";
import ProductCard from "@/components/products-card";
import BakeryCard from "@/components/bakery-card-carousal";
import { useImages } from "@/hooks/useImages";
import { useState } from "react";
import { useEffect } from "react";

export type BakeryImagesType = {
  title: string,
  public_id: string,
  desc: string,
  url: string
}

type GroupedBakeryData = {
  [key: string]: BakeryImagesType[]
}

export default function Bakery() {
  const [groupedBakeryData, setGroupedBakeryData] = useState<GroupedBakeryData>({})

  const {data, error, isLoading} = useImages("bakery");



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
      {/*
        The wrapper has horizontal padding (px-4), so the content inside it
        will not go edge-to-edge by default.
      */}
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
          <ProductCard />
        </div>

        <div
          className="outfit w-screen bg-[#DE4243] py-2 text-center text-white
                        -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)]"
        >
          Order bulk for your house party
        </div>

        {/* Bread Section */}
        {groupedBakeryData.bread && groupedBakeryData.bread.length > 0 && (
          <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
              Bread
            </h2>
            <BakeryCard products={groupedBakeryData.bread} />
          </div>
        )}

        {/* Biscuits Section */}
        {groupedBakeryData.biscuit && groupedBakeryData.biscuit.length > 0 && (
          <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
              Biscuits
            </h2>
            <BakeryCard products={groupedBakeryData.biscuit} />
          </div>
        )}

        {/* Rusk Section */}
        {groupedBakeryData.rusk && groupedBakeryData.rusk.length > 0 && (
          <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
              Rusk
            </h2>
            <BakeryCard products={groupedBakeryData.rusk} />
          </div>
        )}

        {/* Puff & Snacks Section */}
        {groupedBakeryData.puff_and_snacks && groupedBakeryData.puff_and_snacks.length > 0 && (
          <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
              Puff & Snacks
            </h2>
            <BakeryCard products={groupedBakeryData.puff_and_snacks} />
          </div>
        )}

        {/* Sweets Section */}
        {groupedBakeryData.sweets && groupedBakeryData.sweets.length > 0 && (
          <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
              Sweets
            </h2>
            <BakeryCard products={groupedBakeryData.sweets} />
          </div>
        )}
      </div>
    </div>
  );
}
