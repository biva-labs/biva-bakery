import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface EventFormData {
    event_id: string;
    name: string;
    email: string;
    phone_number: string;
    adhaar_or_pan_card: File | null;
    number_of_guest: string;
    table_id: string[];
}

export function useEventForm() {
    return useMutation({
        mutationFn: async (data: EventFormData) => {
            try {
                const formData = new FormData();

                formData.append("event_id", data.event_id);
                data.table_id.forEach((id) => {
                    formData.append("table_id", id);
                });

                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("phone_number", data.phone_number);
                formData.append("total_people", data.number_of_guest);

                if (data.adhaar_or_pan_card) {
                    formData.append(
                        "aadhar_or_pan_img_url",
                        data.adhaar_or_pan_card,
                    );
                }

                return await instance.post("/eventTable", formData, {
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
            console.error("Food Court Form Error:", error.message);
        },
        onSuccess: (response) => {
            console.log(
                "Food Court Form submitted successfully:",
                response.data,
            );
        },
    });
}
