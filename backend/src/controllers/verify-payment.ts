import { createHmac } from "crypto";
import { Hono } from "hono";
import { updateEventAfterPayment } from "../db/index.ts";

const app = new Hono();

app.post("/", async (c) => {
	try {
		const {
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
			users,
			type,
		} = await c.req.json();
		const body = `${razorpay_order_id}|${razorpay_payment_id}`;
		const secret = process.env.RAZORPAY_SECRET!;

		const expectedSignature = createHmac("sha256", secret)
			.update(body)
			.digest("hex");

		if (expectedSignature === razorpay_signature) {
			if (type === "events" && Array.isArray(users) && users.length > 0) {
				await updateEventAfterPayment(users);
			}

			return c.json({
				status: "success",
				message: "Payment verified successfully",
				paymentId: razorpay_payment_id,
			});
		} else {
			console.error("Invalid signature:", {
				expected: expectedSignature,
				got: razorpay_signature,
			});
			return c.json(
				{
					status: "error",
					error: "Invalid signature. Payment verification failed.",
				},
				400,
			);
		}
	} catch (error) {
		console.error("Verification endpoint error:", error);
		return c.json(
			{
				status: "error",
				error: "Internal server error during verification.",
			},
			500,
		);
	}
});

export default app;
