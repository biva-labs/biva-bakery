// src/pages/SeatBookingPage.tsx

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SeatForm from "./seat-form";
import { useParams } from "react-router-dom";
import PayButton from "./pay-button";

export default function SeatBookingPage() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Book Your {id?.[0] === "H" ? (
        <>Room</>
      ) : id?.[0] === "E" ? (
        <>Ticket</>
      ) : (
        <>Table</>
      )}
      </h1>

      {id ? (
        <div className="flex flex-col lg:flex-row gap-8">

          <div className="lg:w-1/2 space-y-4">
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img
                src="/room.jpg"
                alt={`Seat ${id}`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Seat {id}</h2>
              <p className="text-sm text-muted-foreground">Table: Round Table 5</p>
              <p className="text-sm text-green-600 font-medium">Status: Available</p>
            </div>
          </div>

          {/* RIGHT SIDE: Form + Button */}
          <div className="lg:w-1/2 space-y-6">
            <SeatForm table={id} />

            <Separator />

            {/* <Button type="submit" className="w-full">
              Book Now
            </Button> */}
            <PayButton amount={10000} />
          </div>
        </div>
      ) : (
        <p className="text-red-500">Invalid seat ID.</p>
      )}
    </div>
  );
}
