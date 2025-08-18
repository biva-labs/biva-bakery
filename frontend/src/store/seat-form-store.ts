import { create } from "zustand";

interface SeatForm {
  tableId: string;
  name: string;
  email: string;
  phone: string;
  slot: string;
  slotId: string;

  setField: (
    field: "tableId" | "name" | "email" | "phone",
    value: string,
  ) => void;
  setSlot: (slot: string, slotId: string) => void;
}

export const useSeatFormStore = create<SeatForm>()((set) => ({
  tableId: "",
  name: "",
  email: "",
  phone: "",
  slot: "",
  slotId: "",

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  setSlot: (slot, slotId) => set(() => ({ slot, slotId })),
}));
