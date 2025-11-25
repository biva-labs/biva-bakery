import { create } from "zustand";

type GuestForm = {
    id: string;
    name: string;
    email: string;
    adhaar_or_pan_card: File | null;
    phone_number: string;
};

interface FoodCourtEventForm {
    name: string;
    email: string;
    adhaar_or_pan_card: File | null;
    number_of_guest: string;
    phone_number: string;
    event_id: string;
    guest: GuestForm[];

    setField: (
        field:
            | "name"
            | "email"
            | "phone_number"
            | "number_of_guest"
            | "event_id",
        value: string | string[],
    ) => void;

    setGuestField: (
        id: string,
        field: "name" | "email" | "phone_number",
        value: string | string[],
    ) => void;

    setFile: (file: File | null) => void;

    setGuestFile: (id: string, file: File | null) => void;
}

export const useFoodCourtEventFormStore = create<FoodCourtEventForm>()(
    (set) => ({
        name: "",
        email: "",
        adhaar_or_pan_card: null,
        number_of_guest: "",
        phone_number: "",
        event_id: "",
        guest: [],

        setField: (field, value) => {
            console.log("Store setField called with:", field, value);
            set((state) => ({ ...state, [field]: value }));
            // No auto-initialization of guests here
        },

        setGuestField: (id, field, value) => {
            set((state) => {
                const existingGuest = state.guest.find((g) => g.id === id);

                if (existingGuest) {
                    // Update existing guest
                    return {
                        ...state,
                        guest: state.guest.map((guest) =>
                            guest.id === id
                                ? { ...guest, [field]: value }
                                : guest,
                        ),
                    };
                } else {
                    // Create new guest entry when user starts typing
                    const newGuest: GuestForm = {
                        id,
                        name: field === "name" ? (value as string) : "",
                        email: field === "email" ? (value as string) : "",
                        phone_number:
                            field === "phone_number" ? (value as string) : "",
                        adhaar_or_pan_card: null,
                    };

                    return {
                        ...state,
                        guest: [...state.guest, newGuest],
                    };
                }
            });
        },

        setGuestFile: (id, file) => {
            set((state) => {
                const existingGuest = state.guest.find((g) => g.id === id);

                if (existingGuest) {
                    // Update existing guest file
                    return {
                        ...state,
                        guest: state.guest.map((guest) =>
                            guest.id === id
                                ? { ...guest, adhaar_or_pan_card: file }
                                : guest,
                        ),
                    };
                } else {
                    // Create new guest entry when user uploads file
                    const newGuest: GuestForm = {
                        id,
                        name: "",
                        email: "",
                        phone_number: "",
                        adhaar_or_pan_card: file,
                    };

                    return {
                        ...state,
                        guest: [...state.guest, newGuest],
                    };
                }
            });
        },

        setFile: (file) =>
            set((state) => ({ ...state, adhaar_or_pan_card: file })),
    }),
);
