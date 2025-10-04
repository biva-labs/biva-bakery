
import { Button } from "../ui/button";
import SeatForm from "../seat-form";
import { useFoodCourtTableFormStore } from "@/store/food-court-store";
import { useFoodCourtForm } from "@/hooks/useFoodCourtForm";
import usePay from "@/hooks/usePay";

export default function SeatBookingPage() {
    const data = useFoodCourtTableFormStore();
    const { mutate: submitForm, isPending, isError, error } = useFoodCourtForm();
    
    const { initiatePayment, isProcessing } = usePay({
        onSuccess: (response) => {
            console.log("Payment successful:", response);
            alert("Booking confirmed! Payment successful.");
        },
        onError: (message) => {
            console.error("Payment failed:", message);
            alert(message);
        }
    });

    const handleBookAndPay = async () => {
 
        if (!data.name || !data.email || !data.phone_number || !data.time_slot || !data.number_of_guest) {
            alert("Please fill in all required fields");
            return;
        }

        if (!data.adhaar_or_pan_card) {
            alert("Please upload your Aadhar or PAN card");
            return;
        }


        submitForm({
            name: data.name,
            email: data.email,
            phone_number: data.phone_number,
            adhaar_or_pan_card: data.adhaar_or_pan_card,
            preference: data.preference,
            number_of_guest: data.number_of_guest,
            time_slot: data.time_slot,
        }, {
            onSuccess: async (response) => {
                const totalAmount = response.data?.data?.totalAmount || 0;
                await initiatePayment(totalAmount);
            },
            onError: (error) => {
                console.error("Form submission error:", error);
                alert("Form submission failed. Please try again.");
            }
        });
    };

    return (
        <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
            <div className="lg:w-1/2 flex flex-col px-4 py-4 h-full">
                <div className="w-full max-w-md mx-auto flex flex-col h-full">
               
                    <div className="flex-shrink-0 mb-4">
                        <h1 className="text-2xl outfit font-bold text-gray-900 text-center underline">
                            Book Your Seat
                        </h1>
                    </div>
                    
                 
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="bg-white rounded-lg p-4 mb-3 flex-1 overflow-y-auto">
                            <SeatForm />
                        </div>
                        
                       
                        <div className="flex-shrink-0 bg-white rounded-lg p-4">
                            {isError && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                    Error: {error?.message}
                                </div>
                            )}
                            
                            <Button 
                                onClick={handleBookAndPay} 
                                disabled={isPending || isProcessing}
                                className="w-full"
                            >
                                {isPending || isProcessing ? "Processing..." : `Pay Now ${data.number_of_guest * 500 == 0 ? "" : data.number_of_guest * 500}`}
                            </Button>
{/*                         
                            <Button onClick={run} variant="outline" className="w-full mt-2">
                                Debug Data
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center bg-gray-100">
                <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop
                >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}