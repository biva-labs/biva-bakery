import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const images = [
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
  "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
];

export default function HotelHero({
  title,
  description,
  buttonText,
  buttonDescription,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonDescription: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-[40vh] lg:h-[60vh] overflow-hidden -mt-14 mx-auto right-8">
      <div className="absolute inset-0">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
        <h1 className="text-2xl md:text-4xl outfit font-extrabold lg:text-5xl  text-white leading-tight">
          {(() => {
            const words = title.split(" ");
            if (words.length === 2) {
              return (
                <>
                  {words[0]} <br /> {words[1]}
                </>
              );
            }
            if (words.length === 4) {
              return (
                <>
                  {words.slice(0, 2).join(" ")} <br />
                  {words.slice(2).join(" ")}
                </>
              );
            }
            const mid = Math.ceil(words.length / 2);
            return (
              <>
                {words.slice(0, mid).join(" ")} <br />
                {words.slice(mid).join(" ")}
              </>
            );
          })()}
        </h1>
        <p className="mt-2 text-xs font-light md:text-lg lg:text-xl text-gray-200 max-w-xs md:max-w-sm leading-snug pl-2">
          {description || ""}
        </p>
      </div>

      {/* Right text + button */}
      <div className="absolute bottom-0 right-0 p-3 md:p-10 z-20 flex flex-col items-end space-y-2">
        <div className="text-white text-sm md:text-xl">{buttonDescription}</div>

        <Button
          variant="orange"
          className="hover:cursor-pointer mb-4 lg:mb-0 rounded-full"
        >
          {buttonText}
        </Button>
      </div>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === current
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
