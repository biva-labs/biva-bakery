import Hero from "@/components/hero";
import { useState, useEffect } from "react";
import { useImages } from "@/hooks/useImages";
import GalleryMasonry from "@/components/gallery/masonary";
import EventCardCarousel from "@/components/events/event-card-carousal";
import FoodCourtPreference from "@/components/food-court/food-court-prefrence";

import { type CardImagesType } from "@/types/card-images-types";
import { type HeroImagesType } from "@/types/hero-images-types";
import { type GalleryImagesType } from "@/types/gallery-images-types";

type FoodCourtPreference = {
  public_id: string;
  name: string;
  url: string;
}

export default function FoodCourt() {
  const [foodCourtHero, setfoodCourtHero] = useState<HeroImagesType[]>([]);
  const [events, setEvents] = useState<CardImagesType[]>([]);
  const [foodCourtGallery, setFoodCourtGallery] = useState<GalleryImagesType[]>([]);
  const [foodCourtPreference, setFoodCourtPreference] = useState<FoodCourtPreference[]>([])

  const { data, error, isLoading } = useImages("food-court");


  useEffect(() => {
    if (data) {
      // console.log(data);
      setfoodCourtHero(data.data.hero ?? []);
      setEvents(data.data.events ?? []);
      setFoodCourtGallery(data.data.gallery ?? []);
      setFoodCourtPreference(data.data.preference ?? []);
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
          redirect="/table/booking"
          images={foodCourtHero}
        />
        <div className="mt-16 items-center justify-center text-center">
          <h2 className="text-3xl lg:text-4xl text-start justify-center lg:ml-6 ml-4 outfit font-extrabold text-green-950 mb-6">
            Our Delicious Offerings
          </h2>
          <div className="mt-10">
            <FoodCourtPreference preference="veg" />
          </div>
          <div className="mt-10">
            <FoodCourtPreference preference="non-veg" />
          </div>
        </div>
        <div className="mt-16" id="gallery">
          <h2 className="text-3xl lg:text-4xl text-start lg:ml-6 ml-4 outfit font-extrabold text-green-950 mb-2">
            Gallery
          </h2>
          <GalleryMasonry allImages={foodCourtGallery} />
        </div>

        <div id="events" className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-2xl lg:text-4xl text-start outfit font-extrabold lg:ml-6 ml-4 text-green-950 mb-2">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground text-center lg:text-start lg:ml-6 outfit font-medium text-lg">
            Book your table for the best experience
          </p>
        </div>
        <EventCardCarousel events={events} />
      </div>
    </div>
  );
}