import { useEffect, useState, useRef } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface Image {
  public_id: string;
  url: string;
}

interface GalleryMasonryProps {
  allImages: Image[];
}

export default function GalleryMasonry({ allImages }: GalleryMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loopImages, setLoopImages] = useState<Image[]>([]);

  useEffect(() => {
    if (allImages.length === 0) return;

    const containerHeight = containerRef.current?.offsetHeight || 800;
    const rowHeight = 200;
    const rowsNeeded = Math.ceil(containerHeight / rowHeight) + 2;

    const repeatCount = Math.ceil(rowsNeeded / allImages.length);
    const duplicated: Image[] = [];
    for (let i = 0; i < repeatCount; i++) {
      duplicated.push(...allImages);
    }
    setLoopImages(duplicated);
  }, [allImages]);

  // split images into 4 columns (max)
  const columnCount = 4;
  const columns: Image[][] = Array.from({ length: columnCount }, () => []);
  loopImages.forEach((img, idx) => {
    columns[idx % columnCount].push(img);
  });

  // different speeds for each column
  const speeds = ["10s", "15s", "15s", "10s"];

  return (
    <div
      ref={containerRef}
      className="rounded-xl relative px-4 py-8 mt-10 bg-gray-200 overflow-hidden h-[80vh]"
    >
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 320: 2, 640: 3, 1024: 4 }}
        gutterBreakpoints={{ 320: "12px", 640: "16px", 1024: "20px" }}
      >
        <Masonry gap="16px">
          {columns.map((colImages, colIdx) => (
            <div
              key={colIdx}
              className="inline-block w-full animate-scroll"
              style={{
                animation: `scrollY ${speeds[colIdx]} linear infinite`,
              }}
            >
              {colImages.map((img, idx) => (
                <img
                  key={`${img.public_id}-${idx}`}
                  src={img.url}
                  alt={`img-${img.public_id}`}
                  loading="lazy"
                  className="w-full object-cover rounded-lg shadow-md mb-4"
                  style={{ width: "100%", height: "auto" }}
                />
              ))}
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Top & Bottom fade overlays */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-32 z-50 bg-gradient-to-b from-black/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-50 bg-gradient-to-t from-black/50 to-transparent" />

      <style jsx>{`
        @keyframes scrollY {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
