import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface HotelFormData {
    name: string;
    email: string;
    phone_number: string;
    adhaar_or_pan_card: File | null;
    total_people: string;
    join_date: string;
    leave_date: string;
    type: string;
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

                if (data.adhaar_or_pan_card) {
                    formData.append(
                        "aadhar_or_pan_img_url",
                        data.adhaar_or_pan_card,
                    );
                }

                return await instance.post("/hotel", formData, {
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
