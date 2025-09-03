import { Hono } from "hono";
import { razorpay } from "../utils/razorpay.ts";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// this is schema for req validation
const orderSchemas = z.object({
    amount: z.number().int().positive(),
    currency: z.string().default('INR'),
    receipt: z.string().optional(),
})

const app = new Hono();

app.post('/', zValidator('json', orderSchemas), async(c) => {
    const {amount, currency, receipt} = c.req.valid('json');

    try {
        const options = {
            amount: amount.toString(),
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);

        return c.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency
        }, 201)
    }
    catch(error) {
        console.log('Razorpay Order Error:', error)
        return c.json({error: 'Failed to create order'}, 500);
    }
});

app.get('/:id')

export default app;