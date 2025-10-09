// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { Hono } from "https://deno.land/x/hono@v3.7.1/mod.ts";
import { cors } from "https://deno.land/x/hono@v3.7.1/middleware/cors/index.ts";
import { createMiddleware } from "https://deno.land/x/hono@v3.7.1/middleware.ts";
import { db, updateAfterPayment } from "./db.ts";
import { eq } from "npm:drizzle-orm@^0.30.0";

const app = new Hono();

app.use(
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "x-razorpay-signature"],
    allowMethods: ["POST"],
  }),
);

const rawBodyMiddleware = createMiddleware(async (c, next) => {
  const body = await c.req.raw.clone().arrayBuffer();

  c.set("rawBody", body);
  await next();
});

app.use("/razorpay-webhook", rawBodyMiddleware);

app.post("/razorpay-webhook", async (c) => {
  const rawBody = c.get("rawBody") as ArrayBuffer;
  const signature = c.req.header("x-razorpay-signature");

  if (!signature) {
    return c.json({ error: "Missing signature" }, { status: 400 });
  }

  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");

  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET not set");
    return c.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const encoder = new TextEncoder();
  const key = encoder.encode(secret);
  const data = new Uint8Array(rawBody);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

  const isValid = await crypto.subtle.verify(
    "HMAC",
    cryptoKey,
    hexToBytes(signature),
    data,
  );

  if (!isValid) {
    console.warn("Razorpay webhook signature invalid");
    return c.json({ error: "Invalid signature" }, { status: 401 });
  }

  const text = new TextDecoder().decode(data);
  let event;
  try {
    event = JSON.parse(text);
  } catch (er) {
    return c.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const { payload } = event;
    const payment = payload.payment.entity;
    const orderId = payment.order_id;
    const paymentId = payment.id;
    const status = payment.status;

    console.log(payload);

    if (status !== "captured") {
      return c.json({ message: "Payment not captured" }, { status: 500 });
    }

    try {
      const updatedUserData = await updateAfterPayment(payment.notes["userId"]);
      if (updatedUserData) {
        return c.json({ message: "Payment successful" }, { status: 200 });
      }
    } catch (err: any) {
      return c.json({ error: err.message }, { status: 500 });
    }
  } else if (event.event === "payment.failed") {
    const { payload } = event;
    const payment = payload.payment.entity;
    const orderId = payment.order_id;
    const paymentId = payment.id;
    const status = payment.status;

    console.log(payload);

    console.log("Payment failed!");
    return c.json({ message: "Event processed" }, { status: 200 });
  }

  // if (status !== "failed") {
  //   return c.json({ message: "Payment not failed" }, { status: 500 });
  // }
});

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    const hexPair = hex.substring(i * 2, i * 2 + 2);
    bytes[i] = parseInt(hexPair, 16);
  }

  return bytes;
}

serve(app.fetch);

