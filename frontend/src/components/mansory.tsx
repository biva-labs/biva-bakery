import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export default function GalleryMasonry({ allImages, batchSize = 4 }) {
  const [visibleImages, setVisibleImages] = useState(
    allImages.slice(0, batchSize),
  );

  const handleShowMore = () => {
    const next = allImages.slice(
      visibleImages.length,
      visibleImages.length + batchSize,
    );
    setVisibleImages((prev) => [...prev, ...next]);
  };

  const hasMore = visibleImages.length < allImages.length;

  return (
    <div className="px-4 py-8">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 320: 2, 640: 3, 1024: 4 }}
        gutterBreakpoints={{ 320: "12px", 640: "16px", 1024: "20px" }}
      >
        <Masonry gap="16px">
          {visibleImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`img-${idx}`}
              loading="lazy"
              className="w-full object-cover rounded-lg mb-4 shadow-2xl shadow-gray-800 max-h-[300px]"
              style={{ display: "block" }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handleShowMore()}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
