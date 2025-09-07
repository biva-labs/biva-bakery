import { useState } from "react";
import { Button } from "@/components/ui/button";

type SeatState = "available" | "selected" | "booked";
type SeatShape = "square" | "rectangle" | "round";
type SeatSize = "sm" | "md" | "lg";

export default function TableBlock({
  initialState = "available",
  shape = "square",
  size = "md",
  label = "T",
  onSelect,
}: {
  initialState?: SeatState;
  shape?: SeatShape;
  size?: SeatSize;
  label?: string;
  onSelect?: (label: string) => void;
}) {
  const [seatState, setSeatState] = useState<SeatState>(initialState);

  const shapeSize: Record<SeatShape, Record<SeatSize, string>> = {
    square: { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" },
    rectangle: { sm: "w-12 h-6", md: "w-14 h-7", lg: "w-16 h-8" },
    round: { sm: "w-8 h-8 rounded-full", md: "w-10 h-10 rounded-full", lg: "w-12 h-12 rounded-full" },
  };

  const stateStyles: Record<SeatState, string> = {
    available: "bg-gray-200 text-gray-800 border border-black",
    selected: "bg-blue-500 text-white border border-blue-700",
    booked: "bg-gray-400 text-gray-600 border border-gray-600 cursor-not-allowed",
  };

  const handleSeatClick = () => {
    if (seatState === "available") {
      setSeatState("selected");
      onSelect?.(label); // notify parent
    }
  };

  return (
    <Button
      disabled={seatState === "booked"}
      className={`${shapeSize[shape][size]} ${stateStyles[seatState]} hover:scale-105 hover:shadow-md transition-all`}
      onClick={handleSeatClick}
    >
      {label}
    </Button>
  );
}
