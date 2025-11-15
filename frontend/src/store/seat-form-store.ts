import { create } from "zustand";

interface FoodCourtEventForm {
    table_id: string[];
    name: string;
    email: string;

    adhaar_or_pan_card: File | null;
    number_of_guest: string;
    phone_number: string;
    event_id: string;

    setField: (
        field:
            | "table_id"
            | "name"
            | "email"
            | "phone"
            | "number_of_guest"
            | "phone_number"
            | "event_id",
        value: string | string[],
    ) => void;

    setFile: (file: File | null) => void;
}

export const useFoodCourtEventFormStore = create<FoodCourtEventForm>()(
    (set) => ({
        table_id: [],
        name: "",
        email: "",
        adhaar_or_pan_card: null,
        number_of_guest: "",
        phone_number: "",
        event_id: "",

        setField: (field, value) =>
            set((state) => ({ ...state, [field]: value })),

        setFile: (file) =>
            set((state) => ({ ...state, adhaar_or_pan_card: file })),
    }),
);
