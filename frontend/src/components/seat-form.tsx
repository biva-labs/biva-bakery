import { TimeSlotSelect } from "./time-slot";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useSeatFormStore } from "@/store/seat-form-store";
import { useEffect } from "react";

export default function SeatForm({ table }: { table: string }) {
  const { name, email, phone, setField } = useSeatFormStore();

  useEffect(() => {
    if (table) {
      setField("tableId", table);
    }
  }, [table]);

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="table">Table</Label>
        <Input id="table" placeholder="table" value={table} disabled />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="name"
          value={name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="phone">Phone no.</Label>
        <Input
          id="phone"
          placeholder="phone"
          value={phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="phone">Time Slot</Label>
        <TimeSlotSelect />
      </div>
    </>
  );
}
