import { useImages } from "@/hooks/useImages";
import RoomCardCarousel from "../components/hotel/room-card/room-card-carousal";
import Hero from "@/components/hero";
import { useState } from "react";
import { useEffect } from "react";
import GalleryMasonry from "@/components/gallery/masonary";
import Banquet from "@/components/hotel/banquet";


import { type CardImagesType } from "@/types/card-images-types";
import { type HeroImagesType } from "@/types/hero-images-types";
import { type GalleryImagesType } from "@/types/gallery-images-types";

export default function Hotel() {
  const [hotelHero, setHotelHero] = useState<HeroImagesType[]>([]);
  const [hotelRooms, setHotelRooms] = useState<CardImagesType[]>([]);
  const [hotelGallery, setHotelGallery] = useState<GalleryImagesType[]>([]);

  const { data, error, isLoading } = useImages("hotel");

  useEffect(() => {

    if (!data || !data.data) {
      console.warn('no valid data received', data);
      return;
    }

    const { hero, rooms, gallery } = data.data;
    setHotelHero(hero ?? []);
    setHotelRooms(rooms ?? []);
    setHotelGallery(gallery ?? []);

    const grouped: Record<string, CardImagesType[]> = {};
    (rooms ?? []).forEach((v: any) => {
      const tag = v.tag || "untagged";
      if (!grouped[tag]) {
        grouped[tag] = [];
      }
      grouped[tag].push(v);
    });

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
          redirect="#footer"
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

        <div className="mt-10" id="banquet">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-green-950 ">
            Banquet
          </h2>
          <Banquet />
        </div>

        <div className="mt-16" id="gallery">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-green-950 ">
            Gallery
          </h2>
          <GalleryMasonry allImages={hotelGallery} />
        </div>
      </div>
    </div>
  );
}
