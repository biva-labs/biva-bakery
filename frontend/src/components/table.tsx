import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import SeatDetail from "./seat-details";
import { useNavigate } from "react-router-dom";

type SeatState = "available" | "selected" | "booked";
type SeatShape = "square" | "rectangle" | "round";
type SeatSize = "sm" | "md" | "lg";

export default function TableBlock({
  initialState = "available",
  shape = "square",
  size = "md",
  label = "T",
}: {
  initialState?: SeatState;
  shape?: SeatShape;
  size?: SeatSize;
  label?: string;
}) {
  const [seatState, setSeatState] = useState<SeatState>(initialState);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();

  const shapeSize: Record<SeatShape, Record<SeatSize, string>> = {
    square: {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    },
    rectangle: {
      sm: "w-12 h-6",
      md: "w-14 h-7",
      lg: "w-16 h-8",
    },
    round: {
      sm: "w-8 h-8 rounded-full",
      md: "w-10 h-10 rounded-full",
      lg: "w-12 h-12 rounded-full",
    },
  };

  const stateStyles: Record<SeatState, string> = {
    available: "bg-gray-200 text-gray-800 border border-black",
    selected: "bg-blue-500 text-white border border-blue-700",
    booked: "bg-gray-400 text-gray-600 border border-gray-600 cursor-not-allowed",
  };

  const handleSeatClick = () => {
    if (seatState === "available") {
      setSeatState("selected");
      setIsSheetOpen(true);
    }
  };

  const handleSheetChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open && seatState === "selected") {
      setSeatState("available");
    }
  };

  const handleSave = () => {
    setSeatState("booked");
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger asChild>
        <Button
          disabled={seatState === "booked"}
          className={`${shapeSize[shape][size]} ${stateStyles[seatState]} hover:scale-105 hover:shadow-[0_0_10px_2px_rgba(0,0,255,0.5)] hover:text-white transition-all`}
          onClick={handleSeatClick}
        >
          {label}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Seat Details</SheetTitle>
          <SheetDescription>Click book to confirm booking.</SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <SeatDetail />
        </div>

        <SheetFooter>
          <Button onClick={() => navigate(`/test/${label}`)}>Book Now</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
