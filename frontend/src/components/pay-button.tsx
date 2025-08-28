import { createOrder, loadRazorpayScript } from "@/utils/razorpay";
import { useState } from "react";

interface PayButtonProps {
  amount: number;
  onSuccess?: (response: unknown) => void;
  onError?: (message: string) => void;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const PayButton = ({ amount, onSuccess, onError }: PayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const isScriptLoaded = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!isScriptLoaded) {
        throw new Error(
          "Razorpay SDK failed to load. Please check your connection."
        );
      }

      const order = await createOrder(amount);

      const razorpaykey = import.meta.env.VITE_RAZORPAY_ID;
      if (!razorpaykey) {
        throw new Error("Razorpay key is missing in environment variables.");
      }

      // 1. First, define the options object
      const options = {
        key: razorpaykey,
        amount: order.amount,
        currency: order.currency,
        name: "Biva",
        description: "Purchase Description",
        order_id: order.id,
        handler: async function (response: RazorpaySuccessResponse) {
          console.log("Payment Authorization Received!", response);

          try {
            const verificationResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });

            if (!verificationResponse.ok) {
              throw new Error('Payment verification failed on the server.');
            }

            const verificationData = await verificationResponse.json();

            if (verificationData.status === 'success' && onSuccess) {
              onSuccess(response);
            } else {
              throw new Error(verificationData.error || 'Payment verification failed.');
            }
          } catch (error) {
            console.error('Verification error:', error);
            if (onError) {
              onError('Payment completed but verification failed. Please contact support.');
            }
          }
        },
        theme: {
          color: "#2563eb",
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.on('close', function () {
        console.log('Payment modal was closed without completing the payment.');
        setIsLoading(false);
      });

      paymentObject.open();

    } catch (error: unknown) {
      let message = "Payment failed. Please try again.";
      console.error("Payment error:", error);

      if (error instanceof Error) {
        message = error.message;
      }
      if (onError) {
        onError(message);
      }
      setIsLoading(false);
    }

  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="your-styles-here"
    >
      {isLoading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
};

export default PayButton;