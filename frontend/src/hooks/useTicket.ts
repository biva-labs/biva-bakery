import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface TicketData {
    name: string;
    email: string;
    phone: string;
    category: string;
    subject: string;
    description: string;
    attachments?: File[];
}

export interface TicketResponse {
    success: boolean;
    ticketNumber: string;
    message: string;
    data?: any;
}

export function useTicket() {
    return useMutation({
        mutationFn: async (ticketData: TicketData): Promise<TicketResponse> => {
            try {
                // Create FormData for multipart/form-data
                const formData = new FormData();

                // Append all text fields
                formData.append("name", ticketData.name);
                formData.append("email", ticketData.email);
                formData.append("phone", ticketData.phone);
                formData.append("category", ticketData.category);
                formData.append("subject", ticketData.subject);
                formData.append("description", ticketData.description);

                // Append files if any
                if (
                    ticketData.attachments &&
                    ticketData.attachments.length > 0
                ) {
                    ticketData.attachments.forEach((file, index) => {
                        formData.append(`attachments`, file);
                    });
                }

                const response = await instance.post("/ticket", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                return response.data;
            } catch (error: any) {
                if (error.response?.data?.error) {
                    throw new Error(error.response.data.error);
                }
                if (error.response?.data?.message) {
                    throw new Error(error.response.data.message);
                }
                throw new Error("Failed to submit ticket. Please try again.");
            }
        },
        onSuccess: (data) => {
            toast.success("Ticket submitted successfully!");
            // console.log("Ticket submitted successfully:", data.ticketNumber);
        },
        onError: (error) => {
            toast.error(error.message);
            console.error("Ticket submission error:", error.message);
        },
    });
}
