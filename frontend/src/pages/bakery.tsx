import { useImages } from "@/hooks/useImages";
import RoomCardCarousel from "../components/room-card-carousal";
import Hero from "@/components/hero";
import { useState } from "react";
import { useEffect } from "react";
import type { Room } from "../components/room-card-carousal";
import { BentoGridDemo } from "@/components/bento";
import Banquet from "@/components/banquet";
import ProductCard from "@/components/products-card";
import BakeryCard from "@/components/bakery-card";

export default function Bakery() {
  const [hotelHero, setHotelHero] = useState<
    { public_id: string; url: string }[]
  >([]);
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);

  const { data, error, isLoading } = useImages("hotel");

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setHotelHero(data.data.hero ?? []);
      setHotelRooms(data.data.rooms ?? []);
    }
  }, [data]);

  if (error) {
    // handle error
  }

  if (isLoading) {
    // handle loading
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

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Our Bestsellers
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Patties
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Pastries
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Birthday Cakes
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Egg-less Cakes
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Bento Cakes
          </h2>

          <BakeryCard />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
            Muffins
          </h2>

          <BakeryCard />
        </div>
      </div>
    </div>
  );
}
