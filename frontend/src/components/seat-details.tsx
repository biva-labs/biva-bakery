import { Separator } from "@/components/ui/separator";

export default function SeatDetail() {
  return (
    <div className="max-w-6xl max-w-sm">

      <div className="w-full h-48 overflow-hidden rounded-lg">
        <img
          src="/room.jpg" 
          alt="Seat"
          className="w-full h-full object-cover"
        />
      </div>


      <div className="mt-4 space-y-2 px-1">
        <h3 className="text-lg font-semibold">Seat A23</h3>
        <p className="text-sm text-muted-foreground">Table: Round Table 5</p>

        <Separator className="my-2" />

        <p className="text-sm text-muted-foreground">
          Status: <span className="font-medium text-green-600">Available</span>
        </p>
      </div>
    </div>
  );
}
