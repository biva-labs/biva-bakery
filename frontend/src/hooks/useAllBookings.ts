import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface AllBookings {
    email: string;
}

export function useAllBookingsForm() {
    return useMutation({
        mutationFn: async (data: AllBookings) => {
            try {
                const formData = new FormData();

                formData.append("email", data.email);

                return await instance.post("/all-bookings", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error: any) {
                if (error.response?.data?.error) {
                    throw new Error(error.response.data.error);
                }
                throw new Error("Failed to submit food court form");
            }
        },
        onError: (error) => {
            console.error("Bookings Error:", error.message);
        },
        onSuccess: (response) => {
            console.log("Bookings successfully:", response.data);
        },
    });
}
