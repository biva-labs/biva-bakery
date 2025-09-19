import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventCard({
  urls = [],
  onAction,
}: {
  urls: string[];
  onAction?: () => void | Promise<void>;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering || urls.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % urls.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [hovering, urls.length]);

  return (
    <div
      className="relative w-full max-w-sm mx-auto flex flex-col overflow-hidden p-0 transition-transform hover:scale-105 shadow-md hover:shadow-lg group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setIndex(0);
      }}
    >
      {/* Animated Card Border (Conic Gradient) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-2px] rounded-lg blur-sm transition-opacity duration-500 ease-linear md:opacity-0 md:group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 0deg, #ff004d, #ff8a00, #ffd500, #3cff6e, #00d4ff, #7a5cff, #ff004d)",
          zIndex: -1,
        }}
      />
      {/* The main content card sits on top of the animated border */}
      <Card
        className="relative w-full h-full flex flex-col overflow-hidden p-0 z-10"
      >
        {/* Image Slideshow (taller heights) */}
        <div className="relative w-full h-[65vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] max-h-[1000px] overflow-hidden bg-black">
          {urls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`event-${i}`}
              className={`absolute inset-0 w-full h-full object-fit transition-opacity duration-300 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* The new button position container for mobile */}
        <div className="absolute bottom-4 right-4 z-20 md:hidden">
          {/* Button code without the overlay and animation */}
          <Button
            onClick={onAction}
            className="rounded-full px-8 py-4 outfit bg-[#002a3a] text-white text-lg font-semibold shadow-lg"
          >
            Book Now
          </Button>
        </div>

        {/* Hover Overlay with Book Button for larger screens */}
        <div className="hidden absolute inset-0 bg-black/50 transition-opacity duration-300 md:flex md:items-center md:justify-center md:opacity-0 md:group-hover:opacity-100">
          {/* Book button with rainbow ring + animated rainbow text on hover */}
          <div className="group relative inline-block rounded-full p-[6px]">
            {/* rainbow ring (blurred) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full blur-sm transition-opacity duration-200 ease-linear md:opacity-0 md:group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 0deg, #ff004d, #ff8a00, #ffd500, #3cff6e, #00d4ff, #7a5cff, #ff004d)",
                zIndex: 0,
                transform: "translateZ(0)",
              }}
            />
            {/* actual button (top layer) */}
            <Button
              onClick={onAction}
              className="relative z-10 rounded-full px-8 py-4 outfit bg-[#002a3a] text-white text-lg font-semibold overflow-visible shadow-lg"
            >
              {/* fallback plain label (fades out on hover) */}
              <span className="relative z-10 pointer-events-none transition-opacity duration-200 ease-linear group-hover:opacity-0 group-focus-within:opacity-0">
                Book Now
              </span>
              {/* animated-gradient text shown on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-100 group-focus-within:opacity-100"
              >
                <span
                  className="font-semibold outfit"
                >
                  Book Now
                </span>
              </span>
            </Button>
          </div>
        </div>
      </Card>
      {/* scoped styles for button animations + new card border animation */}
      <style jsx>{`
        /* Spin the conic gradient ring for the button */
        .group:hover > span[aria-hidden='true'],
        .group:focus-within > span[aria-hidden='true'] {
          opacity: 1;
          animation: spin-ring var(--spin-duration, 2.2s) linear infinite;
        }
        @keyframes spin-ring {
          to {
            transform: rotate(360deg);
          }
        }
        /* Animate background-position for the inner text */
        .group:hover span[aria-hidden='true'] > span,
        .group:focus-within span[aria-hidden='true'] > span {
          animation: move-bg 3.5s linear infinite;
        }
        @keyframes move-bg {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        /* New: Animate the card's border */
        .group:hover > span:first-of-type,
        .group:focus-within > span:first-of-type {
          animation: spin-card-border var(--spin-duration, 5s) linear infinite;
        }
        @keyframes spin-card-border {
          to {
            transform: rotate(360deg);
          }
        }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .group:hover > span,
          .group:focus-within > span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}