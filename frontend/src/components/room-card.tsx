import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoomCard({
  urls = [],
  title,
  desc,
  onAction,
}: {
  urls: string[];
  title: string | undefined;
  desc?: string | undefined;
  onAction?: () => void | Promise<void>;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering || urls.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % urls.length);
    }, 1200); // ⏩ faster cycling
    return () => clearInterval(interval);
  }, [hovering, urls.length]);

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
            {title}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {desc}
          </CardDescription>
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
