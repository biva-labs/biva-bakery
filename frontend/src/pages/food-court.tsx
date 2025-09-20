import Hero from "@/components/hero";
import { useState, useEffect } from "react";
import { useImages } from "@/hooks/useImages";
import type { Room } from "../components/room-card-carousal";
import { useLocation } from "react-router-dom";
import GalleryMasonry from "@/components/mansory";
import EventCardCarousel from "@/components/event-card-carousal";
import NonVegetarianFood from "@/components/ui/non-veg-food";
import VegetarianFood from "@/components/ui/veg-food";

export default function FoodCourt() {
  const [foodCourtHero, setfoodCourtHero] = useState<
    { public_id: string; url: string }[]
  >([]);
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
  const [foodCourtGallery, setFoodCourtGallery] = useState([]);

  const { data, error, isLoading } = useImages("food-court");

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  useEffect(() => {
    if (data) {
      console.log(data.data);
      setfoodCourtHero(data.data.hero ?? []);
      setHotelRooms(data.data.events ?? []);
      setFoodCourtGallery(data.data.gallery ?? []);
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

        {/* --- Adverts Section with improved UI/UX --- */}
        <div className="mt-16 items-center justify-center text-center">
          <h2 className="text-3xl lg:text-4xl text-start justify-center lg:ml-6 ml-4 outfit font-extrabold text-green-950 mb-6">
            Our Delicious Offerings
          </h2>
          <div className="mx-auto max-w-7xl px-4 py-8  rounded-3xl bg-gray-50 shadow-inner">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10">
              <div className="flex-1 w-full">
                <VegetarianFood />
              </div>
              <div className="flex-1 w-full">
                <NonVegetarianFood />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16" id="gallery">
          <h2 className="text-3xl lg:text-4xl text-start lg:ml-6 ml-4 outfit font-extrabold text-green-950 mb-2">
            Gallery
          </h2>
          <GalleryMasonry allImages={foodCourtGallery} />
        </div>

        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-2xl lg:text-4xl text-start outfit font-extrabold lg:ml-6 ml-4 text-green-950 mb-2">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-center lg:text-start lg:ml-6 outfit font-medium text-lg">
            Book your table for the best experience
          </p>
        </div>
        <EventCardCarousel events={hotelRooms} />
      </div>
    </div>
  );
}