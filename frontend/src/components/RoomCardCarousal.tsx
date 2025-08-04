import * as ScrollArea from "@radix-ui/react-scroll-area";
import RoomCard from "./RoomCard";
import { useRef } from "react";

export default function RoomCardCarousel({ rooms }) {
  const viewportRef = useRef();

  const scrollBy = (delta) => {
    viewportRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="mt-10 ml-5 relative">
      <button
        onClick={() => scrollBy(-300)}
        className="absolute z-20 left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow"
      >
        ◀
      </button>
      <ScrollArea.Root
        type="always"
        scrollbars="horizontal"
        className="w-full overflow-hidden"
      >
        <ScrollArea.Viewport
          ref={viewportRef}
          className="whitespace-normal overflow-x-auto scroll-smooth px-8"
        >
          <div className="inline-flex space-x-4 px-2">
            {rooms.map((room, i) => (
              <div key={i} className="inline-block w-[280px] flex-none">
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar orientation="horizontal" />
        <ScrollArea.Corner />
      </ScrollArea.Root>
      <button
        onClick={() => scrollBy(300)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow"
      >
        ▶
      </button>
    </div>
  );
}
