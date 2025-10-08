import { useState } from "react";
import { createOrder, loadRazorpayScript } from "@/utils/razorpay";
import { instance } from "@/utils/axios";
import { toast } from "sonner";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface UsePayProps {
    onSuccess?: (response: any) => void;
    onError?: (message: string) => void;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export default function usePay({ onSuccess, onError }: UsePayProps = {}) {
    const [isProcessing, setIsProcessing] = useState(false);

    const initiatePayment = async (amount: number, userId: string) => {
        setIsProcessing(true);

        try {
            const isScriptLoaded = await loadRazorpayScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!isScriptLoaded) {
                throw new Error("Razorpay SDK failed to load. Please check your connection.");
            }


            const order = await createOrder(amount);
            const razorpayKey = import.meta.env.VITE_RAZORPAY_ID;

            if (!razorpayKey) {
                throw new Error("Razorpay key is missing in environment variables.");
            }

            const options = {
                key: razorpayKey,
                amount: order.amount,
                currency: order.currency,
                name: "The Biva",
                description: "Food Court Booking",
                order_id: order.id,
                notes: {
                    userId: userId,
                },
                handler: async function (paymentResponse: RazorpayResponse) {
                    try {
                
                        const verificationResponse = await instance.post('/api/verify-payment', {
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_signature: paymentResponse.razorpay_signature,
                        });

                        if (verificationResponse.data?.status === 'success') {
                            toast.success("Booking confirmed! Payment successful.");
                            onSuccess?.(paymentResponse);
                        } else {
                            throw new Error('Payment verification failed.');
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        toast.error('Payment completed but verification failed. Please contact support.');
                        onError?.('Payment completed but verification failed. Please contact support.');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment modal was closed by user');
                        setIsProcessing(false);
                    }
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const paymentObject = new window.Razorpay(options);

            paymentObject.open();

        } catch (paymentError) {
            console.error("Payment error:", paymentError);
            const errorMessage = paymentError instanceof Error
                ? paymentError.message
                : "Payment failed. Please try again.";
            toast.error(errorMessage);
            onError?.(errorMessage);
            setIsProcessing(false);
        }
    };

    return {
        initiatePayment,
        isProcessing
    };
}
