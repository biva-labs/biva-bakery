import { useSeatFormStore } from "@/store/seat-form-store"; // adjust path if needed
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const timeSlots = [
  { slotId: "1", label: "00:00 - 02:00" },
  { slotId: "2", label: "02:00 - 04:00" },
  { slotId: "3", label: "04:00 - 06:00" },
  { slotId: "4", label: "06:00 - 08:00" },
  { slotId: "5", label: "08:00 - 10:00" },
  { slotId: "6", label: "10:00 - 12:00" },
  { slotId: "7", label: "12:00 - 14:00" },
  { slotId: "8", label: "14:00 - 16:00" },
  { slotId: "9", label: "16:00 - 18:00" },
  { slotId: "10", label: "18:00 - 20:00" },
  { slotId: "11", label: "20:00 - 22:00" },
  { slotId: "12", label: "22:00 - 00:00" },
];

export function TimeSlotSelect() {
  const { slotId, setSlot } = useSeatFormStore();

  return (
    <Select
      value={slotId}
      onValueChange={(value) => {
        const selected = timeSlots.find((s) => s.slotId === value);
        if (selected) {
          setSlot(selected.label, selected.slotId);
        }
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a time slot" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Slots</SelectLabel>
          {timeSlots.map((slot) => (
            <SelectItem key={slot.slotId} value={slot.slotId}>
              {slot.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
