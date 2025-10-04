import { useState } from "react";
import { createOrder, loadRazorpayScript } from "@/utils/razorpay";
import { instance } from "@/utils/axios";


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

    const initiatePayment = async (amount: number) => {
        setIsProcessing(true);

        try {
     
            const isScriptLoaded = await loadRazorpayScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!isScriptLoaded) {
                throw new Error("Razorpay SDK failed to load. Please check your connection.");
            }

           
            const order = await createOrder(amount);
            const razorpaykey = import.meta.env.VITE_RAZORPAY_ID;
            
            if (!razorpaykey) {
                throw new Error("Razorpay key is missing in environment variables.");
            }

   
            const options = {
                key: razorpaykey,
                amount: order.amount,
                currency: order.currency,
                name: "Biva",
                description: "Food Court Booking",
                order_id: order.id,
                handler: async function (paymentResponse: RazorpayResponse) {
                    console.log("Payment successful!", paymentResponse);
                    
                    try {
               
                        const verificationResponse = await instance.post('/api/verify-payment', {
                            body: JSON.stringify(paymentResponse),
                        });

                        if (verificationResponse.data?.status === 'success') {
                            onSuccess?.(paymentResponse);
                        } else {
                            throw new Error('Payment verification failed.');
                        }
                    } catch (error) {
                        console.error('Verification error:', error);
                        onError?.('Payment completed but verification failed. Please contact support.');
                    }
                    setIsProcessing(false);
                },
                theme: {
                    color: "#2563eb",
                },
            };

            const paymentObject = new window.Razorpay(options);
            
            paymentObject.on('close', function () {
                console.log('Payment modal was closed');
                setIsProcessing(false);
            });

            paymentObject.open();
            
        } catch (paymentError) {
            console.error("Payment error:", paymentError);
            const errorMessage = paymentError instanceof Error ? paymentError.message : "Payment failed. Please try again.";
            onError?.(errorMessage);
            setIsProcessing(false);
        }
    };

    return {
        initiatePayment,
        isProcessing
    };
}