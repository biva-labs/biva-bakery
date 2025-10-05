import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROOM_TYPE } from "../../../../data/room-data"

import { type CardImagesType } from "@/types/card-images-types";
import { RoomBookingPage } from "../room-booking-page";


export default function RoomCard({
  url = [],
  title,
  desc,
  price,
  onAction,
}: CardImagesType) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if (!hovering || url.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % url.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [hovering, url.length]);

  console.log("from room-card.tsx: " + url, title, desc)

  const isLongDescription = desc && desc.length > 50;

  return (
    <Card
      className="relative w-full max-w-sm mx-auto flex flex-col overflow-hidden p-0 transition-transform hover:scale-105 shadow-md hover:shadow-lg"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setIndex(0);
      }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {Array.isArray(url) &&
          url.map((u, i) => (
            <img
              loading="lazy"
              key={i}
              src={u}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${i === index ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}

      </div>

      <CardContent className="flex-1 flex flex-col justify-between p-4 pb-16 sm:pb-14">
        <div className="flex-1">
          <CardTitle className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
            {ROOM_TYPE[title!]}
          </CardTitle>
          <div className="mb-2">
            <CardDescription
              className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${showFullDesc ? '' : 'line-clamp-1'
                }`}
            >
              {desc}
            </CardDescription>
            {isLongDescription && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDesc(!showFullDesc);
                }}
                className="text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium"
              >
                {showFullDesc ? 'Show less' : 'See details'}
              </button>
            )}
          </div>
          {price && (
            <div className="text-sm font-semibold text-[#002a3a] mt-2">
              ₹{price}
            </div>
          )}
        </div>
      </CardContent>

      <div className="absolute sm:bottom-12 bottom-15 right-3   sm:right-4">
        {/* <Button
          onClick={onAction}
          variant="default"
          size="sm"
          className="rounded-full px-4 py-2 nexa bg-[#002a3a]"
        >
          Book
        </Button> */}

        <RoomBookingPage url={url}/>
      </div>
    </Card>
  );
}
