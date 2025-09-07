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
    <div className="mt-6 space-y-6 p-4 ">
      {/* Table */}
      <div className="space-y-2">
        <Label htmlFor="table" className="text-sm font-medium text-gray-700">
          Table
        </Label>
        <Input id="table" value={table} disabled className="bg-gray-100" />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone no.
        </Label>
        <Input
          id="phone"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </div>

      {/* Time Slot */}
      <div className="space-y-2">
        <Label htmlFor="time" className="text-sm font-medium text-gray-700">
          Time Slot
        </Label>
        <TimeSlotSelect />
      </div>
    </div>
  );
}
