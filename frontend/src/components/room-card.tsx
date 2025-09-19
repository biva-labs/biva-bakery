import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {ROOM_TYPE} from "../../data/room-data"

export default function RoomCard({
  urls = [],
  title,
  desc,
  price,
  onAction,
}: {
  urls: string[];
  title: string;
  desc?: string | undefined;
  price?: string | undefined;
  onAction?: () => void | Promise<void>;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if (!hovering || urls.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % urls.length);
    }, 1200); // ⏩ faster cycling
    return () => clearInterval(interval);
  }, [hovering, urls.length]);

  console.log("from room-card.tsx: " + urls, title, desc)

  // Check if description is long (more than 50 characters)
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
      {/* Image Slideshow */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {urls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col justify-between p-4 pb-16 sm:pb-14">
        <div className="flex-1">
          <CardTitle className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
            {ROOM_TYPE[title]}
          </CardTitle>
          <div className="mb-2">
            <CardDescription 
              className={`text-xs sm:text-sm text-muted-foreground leading-relaxed ${
                showFullDesc ? '' : 'line-clamp-1'
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

      {/* Book Button */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
        <Button
          onClick={onAction}
          variant="default"
          size="sm"
          className="rounded-full px-4 py-2 nexa bg-[#002a3a]"
        >
          Book
        </Button>
      </div>
    </Card>
  );
}
