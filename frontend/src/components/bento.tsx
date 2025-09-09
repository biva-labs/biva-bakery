import { BentoGrid, BentoGridItem } from "@camped-ui/bento-grid";
import { useState } from "react";

interface Image {
  public_id: string;
  url: string;
}

export function BentoGridDemo({ images }: { images: Image[] }) {
  const [visibleCount, setVisibleCount] = useState(6); // initially show 6 images

  // Repeat images to fill the visible count
  const data = Array.from({ length: visibleCount }, (_, i) => images[i % images.length] || null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // load 6 more images on each click
  };

  return (
    <div className="w-full px-4 lg:px-8 mt-5">
      <BentoGrid className="w-full auto-rows-[12rem] md:auto-rows-[16rem] gap-2 md:gap-3">
        {data.map((img, i) => (
          <BentoGridItem
            key={i}
            header={
              img ? (
                <img
                  src={img.url}
                  alt={`Image ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Skeleton />
              )
            }
            className={`
              ${i % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
              ${i % 5 === 0 ? "md:col-span-2" : ""}
            `}
          />
        ))}
      </BentoGrid>

      {/* Read More Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLoadMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          Read More to Load More Images
        </button>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse"></div>
);
