import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/axios";
import axios from "axios";
import type { AnnouncementData } from "@/components/announcement-templates";

interface AnnouncementResponse extends AnnouncementData {
    id: string;
    isActive: boolean;
}

export function useAnnouncements() {
    return useQuery({
        queryKey: ["announcements"],
        queryFn: async (): Promise<AnnouncementResponse[]> => {
            try {
                const response = await axios.get(
                    "https://biva-bakery-backend.onrender.com/announcements",
                    // https://biva-bakery-backend.onrender.com/announcements
                );

                console.log("RESPONSE", response);

                return response.data.data;
            } catch (error: any) {
                console.error("Failed to fetch announcements:", error);
                return [];
            }
        },
        refetchOnWindowFocus: false,
    });
}
