// import GalleryMasonry from "../components/mansory";
import RoomCardCarousel from "../components/room-card-carousal";
import Hero from "@/components/hero";
import { useState, useEffect } from "react";
import { useImages } from "@/hooks/useImages";
import type { Room } from "../components/room-card-carousal";
// import { BentoGridDemo } from "@/components/bento";
import GalleryMasonry from "@/components/mansory";

export default function FoodCourt() {
  const [foodCourtHero, setfoodCourtHero] = useState<
    { public_id: string; url: string }[]
  >([]);
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);

  const { data, error, isLoading } = useImages("food-court");

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setfoodCourtHero(data.data.hero ?? []);
      setHotelRooms(data.data.events ?? []);
    }
  }, [data]);

  if (error) {
    // handle error
  }

  if (isLoading) {
    // handle loading
  }

  return (
    <div>
      <div className="mx-auto px-4 lg:mr-0 ">
        <Hero
          title={
            <div className="mb-5">
              The Biva <br />
              Food Court
            </div>
          }
          description={<></>}
          buttonDescription={
            <div className="max-w-[220px] md:max-w-xs text-right">
              Book your table in advance for upcoming events
            </div>
          }
          buttonText={<>Book Now</>}
          redirect="/test"
          images={foodCourtHero}
        />


        <div className="mt-16 text-center">
          <h2 className="text-3xl lg:text-4xl outfit font-extrabold text-green-950 mb-4">
            🍽️ Book Your Table
          </h2>
          <p className="text-muted-foreground text-lg font-medium mb-6">
            Reserve your spot and enjoy events without the wait
          </p>

          <a
            href="/test/T11"
            className="relative top-10 inline-block px-10 py-4 font-semibold text-white nexa bg-[#002a3a] rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* 🍕🍔 Emojis around border with spacing */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">🍕</span>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 animate-bounce delay-200">🍔</span>
            <span className="absolute top-1/2 -left-12 -translate-y-1/2 animate-bounce delay-500">🍽️</span>
            <span className="absolute top-1/2 -right-12 -translate-y-1/2 animate-bounce delay-700">🥗</span>

            {/* Button text */}
            Book Now
          </a>
        </div>
        {/* 🔼 New Section ends */}

        <div className="mt-16">
          <h2 className="text-3xl lg:text-4xl text-start lg:ml-6 ml-4 outfit font-extrabold  text-green-950 mb-2">
            Gallery
          </h2>
          <GalleryMasonry allImages={foodCourtHero} />
          {/* <BentoGridDemo images={foodCourtHero}/> */}
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-2xl lg:text-4xl text-start outfit font-extrabold lg:ml-6 ml-4 text-green-950 mb-2">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-center lg:text-start lg:ml-6 outfit font-medium text-lg">
            Book your table for the best experience
          </p>
        </div>
        <RoomCardCarousel rooms={hotelRooms} />
      </div>
    </div>


  );
}
