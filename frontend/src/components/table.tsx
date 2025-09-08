import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx"; // Assuming you have clsx installed

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

  // Define more attractive default and state styles
  const stateStyles: Record<SeatState, string> = {
    available: "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 border-gray-400 shadow-md",
    selected: "bg-gradient-to-br from-blue-500 to-blue-700 text-white border-blue-800 shadow-lg ring-2 ring-blue-300",
    booked: "bg-gradient-to-br from-gray-400 to-gray-500 text-gray-600 border-gray-500 shadow-inner cursor-not-allowed opacity-70",
  };

  const handleSeatClick = () => {
    if (seatState === "available") {
      setSeatState("selected");
      onSelect?.(label); // notify parent
    }
  };

  const commonClasses = clsx(
    "flex items-center justify-center font-semibold relative overflow-hidden", // Added overflow-hidden for potential inner effects
    "transition-all duration-300 ease-in-out" // Smooth transitions for all properties
  );

  // Apply hover effects conditionally based on state
  const interactiveHoverClasses = clsx(
    seatState !== "booked" && [
      "hover:scale-105", // Scale up slightly on hover
      "hover:shadow-xl", // Enhanced shadow on hover
      "hover:brightness-110", // Slightly brighter on hover
      // Inner glow/halo effect on hover using box-shadow
      "hover:ring-2 hover:ring-offset-2 hover:ring-yellow-300", // Soft yellow ring
    ]
  );

  return (
    <Button
      disabled={seatState === "booked"}
      className={clsx(
        commonClasses,
        shapeSize[shape][size],
        stateStyles[seatState],
        interactiveHoverClasses
      )}
      onClick={handleSeatClick}
    >
      {label}
    </Button>
  );
}