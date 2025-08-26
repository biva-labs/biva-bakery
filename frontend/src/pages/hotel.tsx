import { useImages } from "@/hooks/useImages";
import GalleryMasonry from "../components/mansory";
import RoomCardCarousel from "../components/room-card-carousal";
import Hero from "@/components/hero";
import { useState } from "react";
import { useEffect } from "react";
import type { Room } from "../components/room-card-carousal";

export default function Hotel() {
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
    <div>
      <div className="mx-auto px-4 lg:mr-0 ">
        <Hero
          title={
            <>
              Experience <br /> Luxury
            </>
          }
          description={
            <>
              Experience luxury and
              <br /> comfort in the heart of the city
            </>
          }
          buttonText={<>Contact Us</>}
          buttonDescription={<>Available at just ₹4999/-</>}
          images={hotelHero}
        />
        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl lg:text-4xl outfit font-extrabold ml-4 text-start lg:ml-6 text-green-950 mb-2">
            Our Premium Rooms
          </h2>
          <p className="text-gray-600 ml-4 text-start lg:ml-6  font-medium text-lg">
            Experience luxury and comfort in the heart of the city
          </p>
        </div>
        <RoomCardCarousel rooms={hotelRooms} />

        <div className="mt-16">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-green-950 ">
            Gallery
          </h2>
          <GalleryMasonry allImages={hotelHero} />
        </div>
      </div>
    </div>
  );
}
