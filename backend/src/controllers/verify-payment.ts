import { createHmac } from "crypto";
import { Hono } from "hono";

const app = new Hono();

app.post('/', async (c) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await c.req.json();
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const secret = process.env.RAZORPAY_SECRET!;

        const expectedSignature = createHmac('sha256', secret)
            .update(body)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            console.log('Payment verified successfully for order:', razorpay_order_id);
            return c.json({
                status: 'success',
                message: 'Payment verified successfully',
                paymentId: razorpay_payment_id
            });
        } else {
            console.error('Invalid signature:', { expected: expectedSignature, got: razorpay_signature });
            return c.json({
                status: 'error',
                error: 'Invalid signature. Payment verification failed.'
            }, 400);
        }
    } catch (error) {
        console.error('Verification endpoint error:', error);
        return c.json({
            status: 'error',
            error: 'Internal server error during verification.'
        }, 500);
    }
});

export default app;