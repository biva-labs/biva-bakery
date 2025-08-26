import GalleryMasonry from "../components/mansory";
import RoomCardCarousel from "../components/room-card-carousal";
import Hero from "@/components/hero";
import { useState, useEffect } from "react";
import { useImages } from "@/hooks/useImages";
import type { Room } from "../components/room-card-carousal";

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
          images={foodCourtHero}
        />

        <div className="mt-16">
          <h2 className="text-3xl lg:text-4xl text-start lg:ml-6 ml-4 outfit font-extrabold  text-green-950 mb-2">
            Gallery
          </h2>
          <GalleryMasonry allImages={foodCourtHero} />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-2xl lg:text-4xl text-start outfit font-extrabold lg:ml-6 ml-4 text-green-950 mb-2">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground *: text-center lg:text-start lg:ml-6 outfit font-medium text-lg">
            Book your table for the best experience
          </p>
        </div>
        <RoomCardCarousel rooms={hotelRooms} />
      </div>
    </div>
  );
}
