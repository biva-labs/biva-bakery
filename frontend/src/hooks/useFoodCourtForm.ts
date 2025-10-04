import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface FoodCourtFormData {
    name: string;
    email: string;
    phone_number: string;
    adhaar_or_pan_card: File | null;
    preference: string;
    number_of_guest: string;
    time_slot: string;
}

export function useFoodCourtForm() {
    return useMutation({
        mutationFn: async (data: FoodCourtFormData) => {
            try {
         
                const formData = new FormData();
                
                formData.append('name', data.name);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone_number);
                formData.append('timeSlot', data.time_slot);
                formData.append('total_people', data.number_of_guest); 
                formData.append('food_preference', data.preference); 
                
   
                if (data.adhaar_or_pan_card) {
                    formData.append('aadhar_or_pan_img_url', data.adhaar_or_pan_card); 
                }

                return await instance.post('/foodCourtTable', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
            console.log("Food Court Form submitted successfully:", response.data);
        }
    });
}

