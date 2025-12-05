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
                );

                // Transform the data to ensure it has the correct structure
                const announcements = Array.isArray(response.data)
                    ? response.data
                    : [response.data];

                return announcements.map(
                    (announcement: any, index: number) => ({
                        id: announcement.id || `announcement-${index}`,
                        isActive: announcement.isActive !== false, // Default to true if not specified
                        title: announcement.title || "",
                        body: announcement.body || "",
                        image: announcement.image || "",
                        displayType: announcement.displayType || "notification",
                        styling: {
                            backgroundColor:
                                announcement.styling?.backgroundColor ||
                                "#ffffff",
                            textColor:
                                announcement.styling?.textColor || "#000000",
                            borderColor:
                                announcement.styling?.borderColor || "#e2e8f0",
                            fontSize: announcement.styling?.fontSize || "md",
                            alignment:
                                announcement.styling?.alignment || "center",
                        },
                    }),
                );
            } catch (error: any) {
                console.error("Failed to fetch announcements:", error);
                return [];
            }
        },
        refetchOnWindowFocus: false,
    });
}
