import { useState, useEffect } from "react";

interface HoverSlideshowCardProps {
  urls: string[];
  title: string;
  onClick: () => void;
}

export default function HoverSlideshowCard({
  urls,
  title,
  onClick,
}: HoverSlideshowCardProps) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Cycle through images on hover
  useEffect(() => {
    if (!hovering) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % urls.length);
    }, 2000); // 2s per slide
    return () => clearInterval(interval);
  }, [hovering, urls.length]);

  return (
    <div
      className="relative cursor-pointer group overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setIndex(0); // reset to first image when leaving
      }}
      onClick={onClick}
    >
      {/* Image container */}
      <div className="relative w-full h-48">
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

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-sm font-medium">
        {title}
      </div>
    </div>
  );
}
