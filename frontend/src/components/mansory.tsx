import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Image {
  public_id: string;
  url: string;
}

interface GalleryMasonryProps {
  allImages: Image[];
  batchSize?: number;
}

export default function GalleryMasonry({
  allImages,
  batchSize = 4,
}: GalleryMasonryProps) {
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);

  useEffect(() => {
    setVisibleImages(allImages.slice(0, batchSize));
  }, [allImages, batchSize]);

  const handleShowMore = () => {
    const next = allImages.slice(
      visibleImages.length,
      visibleImages.length + batchSize
    );
    setVisibleImages((prev) => [...prev, ...next]);
  };

  const hasMore = visibleImages.length < allImages.length;

  return (
    <div className="px-4 py-8 mt-10 bg-gray-200">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 320: 2, 640: 3, 1024: 4 }}
        gutterBreakpoints={{ 320: "12px", 640: "16px", 1024: "20px" }}
      >
        <Masonry gap="16px">
          {visibleImages.map((img) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={`img-${img.public_id}`}
              loading="lazy"
              className="w-full object-cover rounded-lg mb-4"
              style={{
                width: "100%",
                height: "auto", // maintain natural aspect ratio
              }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
