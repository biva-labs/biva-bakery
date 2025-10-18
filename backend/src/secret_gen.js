// generate_signature.js
import crypto from "crypto";

// Your webhook secret
const secret = "biva";

// The exact JSON body you’ll send to Supabase test panel
const body = JSON.stringify({
  event: "payment.captured",
  payload: {
    payment: {
      entity: {
        id: "pay_12345",
        status: "captured",
        amount: 50000,
        currency: "INR",
        notes: { userId: "user_abc" },
      },
    },
  },
});

// Generate HMAC SHA256 signature
const signature = crypto
  .createHmac("sha256", secret)
  .update(body)
  .digest("hex");

console.log("x-razorpay-signature:", signature);
