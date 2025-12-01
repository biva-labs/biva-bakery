import { create } from "zustand";

interface HotelForm {
  name: string;
  email: string;
  phone_number: string;
  adhaar_or_pan_card: File | null;
  total_people: string;
  join_date: string;
  leave_date: string;
  total_days: string;
  total_rooms: string;

  setField: (
    field:
      | "name"
      | "email"
      | "phone_number"
      | "total_people"
      | "join_date"
      | "leave_date"
      | "total_rooms"
      | "total_days",
    value: string,
  ) => void;

  setFile: (file: File | null) => void;
}

export const useHotelStore = create<HotelForm>()((set) => ({
  name: "",
  email: "",
  phone_number: "",
  adhaar_or_pan_card: null,
  total_people: "1",
  join_date: "",
  leave_date: "",
  total_days: "",
  total_rooms: "1",

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  setFile: (file) => set((state) => ({ ...state, adhaar_or_pan_card: file })),
}));
