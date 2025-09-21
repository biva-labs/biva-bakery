import { create } from "zustand";

interface FoodCourtEventForm {
  table_id: string[];
  name: string;
  email: string;
  phone: string;
  adhaar_or_pan_card: string;
  number_of_guest: string;

  setField: (
    field: "table_id" | "name" | "email" | "phone" | "adhaar_or_pan_card" | "number_of_guest",
    value: string | string[],
  ) => void;

}


export const useFoodCourtEventFormStore = create<FoodCourtEventForm>()((set) => ({
  table_id: [],
  name: "",
  email: "",
  phone: "",
  adhaar_or_pan_card: "",
  number_of_guest: "",


  setField: (field, value) => set((state) => ({ ...state, [field]: value })),


}));
