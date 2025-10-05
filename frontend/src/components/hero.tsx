import { useState, useEffect, type ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { type HeroImagesType } from "@/types/hero-images-types";

type HeroType = {
  title?: ReactElement;
  description?: ReactElement;
  buttonText?: ReactElement;
  buttonDescription?: ReactElement;
  images?: HeroImagesType[];
  redirect?: string;
}

export default function Hero({
  title,
  description,
  buttonText,
  buttonDescription,
  images,
  redirect,
}: HeroType) {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isBakeryPage = location.pathname.includes("/bakery");

  useEffect(() => {
    if (!images || images.length === 0) {
      setCurrent(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);


  const titleWrapperBaseClasses = "absolute bottom-0 p-6 md:p-10 z-20";
  
  const titleWrapperClasses = clsx(
    titleWrapperBaseClasses,

    isBakeryPage ? "left-1/2 transform -translate-x-1/2 w-full text-center" : "left-0"
  );

  
  return (
    <div className="relative w-screen h-[40vh] lg:h-[60vh] -mt-14 right-4">
      <div className="absolute inset-0">
        {isBakeryPage ? (
          <>
            <img
              src="/bakery-hero.webp"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 `}
            />
          </>
        ) : (
          <>
            {images?.map((src, idx) => (
              <img
                fetchPriority="high"
                key={src.public_id}
                src={src.url}
                alt={`Slide ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </>
        )}
      </div>

      <div className="absolute inset-0 bg-black/40 z-10" />


      <div className={titleWrapperClasses}>
        <h1 className={`text-2xl md:text-4xl outfit font-extrabold lg:text-5xl text-white leading-tight`}>
          {title}
        </h1>

        {!isBakeryPage && (
          <p className="mt-2 text-xs font-light md:text-lg lg:text-xl text-gray-200 max-w-xs md:max-w-sm leading-snug">
            {description || ""}
          </p>
        )}
      </div>


      {!isBakeryPage && (
        <>
          <div className="absolute bottom-0 right-0 p-3 md:p-10 z-20 flex flex-col items-end space-y-2">
            <div className="text-white text-sm md:text-xl">
              {buttonDescription}
            </div>

            <Button
              variant="orange"
              onClick={() => navigate(redirect ? redirect : "/")}
              className="hover:cursor-pointer mb-4 lg:mb-0 w-28 lg:w-max nexa rounded-full"
            >
              {buttonText}
            </Button>
          </div>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {images?.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}