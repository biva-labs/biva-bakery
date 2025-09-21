import { create } from "zustand";

interface FoodCourtTableForm {
    name: string;
    email: string;
    phone_number: string;
    adhaar_or_pan_card: string;
    preference: string;
    number_of_guest: string;
    time_slot: string;


    setField: (
        field: "adhaar_or_pan_card" | "name" | "email" | "phone_number" | "preference" | "number_of_guest" | "time_slot",
        value: string,
    ) => void;
}

export const useFoodCourtTableFormStore = create<FoodCourtTableForm>()((set) => ({
    name: "",
    email: "",
    phone_number: "",
    adhaar_or_pan_card: "",
    preference: "",
    number_of_guest: "",
    time_slot: "",


    setField: (field, value) => set((state) => ({ ...state, [field]: value }))
}))




// export const useSeatFormStore = create<SeatForm>()((set) => ({
//   tableId: "",
//   name: "",
//   email: "",
//   phone: "",
//   slot: "",
//   slotId: "",

//   setField: (field, value) => set((state) => ({ ...state, [field]: value })),

//   setSlot: (slot, slotId) => set(() => ({ slot, slotId })),
// }));
