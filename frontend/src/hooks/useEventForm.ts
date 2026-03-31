import { instance } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

interface GuestData {
	id: string;
	name: string;
	email: string;
	phone_number: string;
	adhaar_or_pan_card: File | null;
}

interface EventFormData {
	event_id: string;
	name: string;
	email: string;
	phone_number: string;
	adhaar_or_pan_card: File | null;
	number_of_guest: string;
	guest: GuestData[];
}

export function useEventForm() {
	return useMutation({
		mutationFn: async (data: EventFormData) => {
			try {
				// console.log("Input data:", data);
				const formData = new FormData();

				// Main form data
				formData.append("event_id", data.event_id);
				formData.append("name", data.name);
				formData.append("email", data.email);
				formData.append("phone_number", data.phone_number);
				formData.append("total_people", data.number_of_guest);

				// Main user's document
				if (data.adhaar_or_pan_card) {
					formData.append(
						"aadhar_or_pan_img_url",
						data.adhaar_or_pan_card,
					);
				}

				// Convert guest data to JSON (without File objects)
				const guestDataForJson = data.guest.map((guest) => ({
					id: guest.id,
					name: guest.name,
					email: guest.email,
					phone_number: guest.phone_number,
				}));

				// Send guest metadata as JSON
				formData.append("guest", JSON.stringify(guestDataForJson));

				// Send guest images as array [img1, img2, img3...]
				const guestImages = data.guest
					.map((guest) => guest.adhaar_or_pan_card)
					.filter((file): file is File => file !== null);

				guestImages.forEach((image, index) => {
					formData.append("guest_images[]", image);
				});

				// Alternative: Send with indexed names if backend prefers
				// guestImages.forEach((image, index) => {
				//     formData.append(`guest_images[${index}]`, image);
				// });

				// Debug: Log what we're sending
				// console.log("FormData contents:");
				// console.log("Main form data:", {
				//     event_id: data.event_id,
				//     name: data.name,
				// email: data.email,
				// phone_number: data.phone_number,
				//     total_people: data.number_of_guest,
				// });
				// console.log("Guest JSON:", guestDataForJson);
				// console.log("Guest images count:", guestImages.length);

				// Log all FormData entries for debugging
				// console.log("All FormData entries:");
				// for (const [key, value] of formData.entries()) {
				// 	console.log(key, typeof value === "object" ? "[File]" : value);
				// }

				const response = await instance.post("/eventTable", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				return response;
			} catch (error: unknown) {
				// console.error("Full error object:", error);

				if (error instanceof Error && "response" in error) {
					const axiosError = error as {
						response?: {
							data?: any;
							status?: number;
							statusText?: string;
						};
					};

					console.error("Response error:", {
						status: axiosError.response?.status,
						statusText: axiosError.response?.statusText,
						data: axiosError.response?.data,
					});

					if (axiosError.response?.data?.error) {
						throw new Error(axiosError.response.data.error);
					}

					if (axiosError.response?.data?.message) {
						throw new Error(axiosError.response.data.message);
					}

					throw new Error(
						`Request failed with status ${axiosError.response?.status}: ${axiosError.response?.statusText}`,
					);
				}

				throw new Error("Failed to submit event form");
			}
		},
		onError: (error) => {
			console.error("Event Form Error:", error.message);
		},
		onSuccess: (response) => {
			// console.log("Event Form submitted successfully:", response.data);
		},
	});
}
