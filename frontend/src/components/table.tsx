import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import SeatForm from "./seat-form";
import { useSeatFormStore } from "@/store/seat-form-store";
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

  const { name, tableId } = useSeatFormStore();

  const shapeSize: Record<SeatShape, Record<SeatSize, string>> = {
    square: {
      sm: "w-8 h-8 md:w-9 md:h-9",
      md: "w-10 h-10 md:w-12 md:h-12",
      lg: "w-12 h-12 md:w-14 md:h-14",
    },
    rectangle: {
      sm: "w-12 h-6 md:w-14 md:h-7",
      md: "w-14 h-7 md:w-16 md:h-8",
      lg: "w-16 h-8 md:w-20 md:h-9",
    },
    round: {
      sm: "w-8 h-8 md:w-10 md:h-10 rounded-full",
      md: "w-10 h-10 md:w-12 md:h-12 rounded-full",
      lg: "w-12 h-12 md:w-14 md:h-14 rounded-full",
    },
  };

  const stateStyles: Record<SeatState, string> = {
    available:
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 active:scale-[.98]",
    selected:
      "bg-blue-600 text-white border border-blue-700 shadow hover:bg-blue-700",
    booked:
      "bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed",
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
    console.log(name, tableId);
    setSeatState("booked");
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetChange}>
      <SheetTrigger asChild>
        <Button
          disabled={seatState === "booked"}
          className={`${shapeSize[shape][size]} ${stateStyles[seatState]} hover:cursor-pointer`}
          onClick={handleSeatClick}
        >
          {label}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Seat Details</SheetTitle>
          <SheetDescription>
            Click book to confirm booking.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {/* <SeatForm table={label} /> */}
          <SeatDetail />
        </div>

        <SheetFooter>
          <Button onClick={() => navigate(`${`/test/${label}`}`)}>Book Now</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
