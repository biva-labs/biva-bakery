import { instance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

async function fetchRoomDetails(room_type: string) {
    // console.log(room_type);
    const res = await instance.get(`/room-details/${room_type}`);
    return res.data;
}

export function useRoomDeatils(room_type: string) {
    return useQuery({
        queryKey: ["room-details", room_type],
        queryFn: () => fetchRoomDetails(room_type),
        staleTime: 1000 * 60,
    });
}
