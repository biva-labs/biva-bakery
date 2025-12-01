import type { CardImagesType } from "@/types/card-images-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomStore {
    rooms: Record<string, CardImagesType>;
    setAllRooms: (data: Record<string, CardImagesType>) => void;
}

export const useRoomStore = create<RoomStore>()(
    persist(
        (set) => ({
            rooms: {},

            // Set full object: { deluxe: {...}, suite: {...} }
            setAllRooms: (data) => set({ rooms: data }),
        }),
        {
            name: "hotel-rooms", // localStorage key
        },
    ),
);
