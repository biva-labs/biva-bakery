import { BentoGrid, BentoGridItem } from "@camped-ui/bento-grid";

interface Image {
  public_id: string;
  url: string;
}

export function BentoGridDemo({ images }: { images: Image[] }) {
  const data = images.length > 0 ? images : Array(6).fill(null);

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
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 animate-pulse"></div>
);
