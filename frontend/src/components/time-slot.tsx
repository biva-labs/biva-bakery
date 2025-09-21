import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFoodCourtTableFormStore } from "@/store/food-court-store";

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
  const location = useLocation();
  const path = location.pathname;
  // const isEventForm = path.includes('/events/booking');
  
  // Only food court forms have time slots, events don't need them
  // So we always use the food court store for time slots
  const { time_slot, setField } = useFoodCourtTableFormStore();



  return (
    <Select
      value={time_slot}
      onValueChange={(value) => setField("time_slot", value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a time slot" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Slots</SelectLabel>
          {timeSlots.map((slot) => (
            <SelectItem key={slot.slotId} value={slot.label}>
              {slot.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

