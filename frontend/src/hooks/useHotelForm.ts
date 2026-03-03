import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface HotelFormData {
    name: string;
    email: string;
    phone_number: string;
    adhaar_or_pan_card: File | null;
    secondary_doc_card: File | null;
    total_people: string;
    join_date: string;
    leave_date: string;
    type: string;
    total_days: string;
    total_rooms: string;
}

export function useHotelForm() {
    return useMutation({
        mutationFn: async (data: HotelFormData) => {
            try {
                const formData = new FormData();

                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("phone_number", data.phone_number);
                formData.append("total_people", data.total_people);
                formData.append("join_date", data.join_date);
                formData.append("leave_date", data.leave_date);
                formData.append("type", data.type);
                formData.append("total_days", data.total_days);
                formData.append("total_rooms", data.total_rooms);

                if (data.adhaar_or_pan_card) {
                    formData.append(
                        "aadhar_or_pan_img_url",
                        data.adhaar_or_pan_card,
                    );
                }

                if (data.secondary_doc_card) {
                    formData.append(
                        "secondary_doc_img_url",
                        data.secondary_doc_card,
                    );
                }

                return await instance.post("/hotel", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error: unknown) {
                const err = error as {
                    response?: { data?: { error?: string } };
                };
                if (err.response?.data?.error) {
                    throw new Error(err.response.data.error);
                }
                throw new Error("Failed to submit hotel form");
            }
        },
        onError: (error) => {
            console.error("hotel Form Error:", error.message);
        },
        onSuccess: (response) => {
            console.log("hotel Form submitted successfully:", response.data);
        },
    });
}
