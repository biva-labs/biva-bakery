import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { getImage, uploadImage } from "./controllers/image-controller.ts";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import orders from "./controllers/paymentOrder.ts";
import verifyPayment from "./controllers/verify-payment.ts";
import { insertFoodCourt } from "./db/index.ts";
import { CloudinaryService } from "./utils/cloudinary-service.ts";
import { foodCourtForm } from "./controllers/foodCourtForm.ts";
import { bivaAiChat } from "./controllers/biva-ai.ts";
import { eventFormData } from "./controllers/eventFormData.ts";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";

const app = new Hono();
app.use(secureHeaders());

const allowedOrigin = "http://localhost:5173";
// https://biva-bakery.onrender.com
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/images/:folder", getImage);
app.route("/api/orders", orders);
app.route("/api/verify-payment", verifyPayment);

app.post("/wh", async (c) => {
  const rawBody = await c.req.arrayBuffer();
  const signature = c.req.raw.headers.get("x-razorpay-signature");
  const secret = "biva";
  if (!signature || !secret) {
    return c.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const isValid = await validateWebhookSignature(
    new TextDecoder().decode(rawBody),
    signature,
    secret,
  );

  if (!isValid) {
    return c.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(new TextDecoder().decode(rawBody));
  } catch (err) {
    return c.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.event === "payment.captured") {
    const { payload } = event;
    const payment = payload.payment.entity;
    console.log("Payment captured:", payment);
    // Handle payment captured logic here
  } else {
    console.log("Unhandled event:", event.event);
  }

  return c.json({ message: "Event processed" });
});

app.post("/test", async (c) => {
  try {
    const data = await c.req.parseBody();
    const insertedData = await insertFoodCourt(data);
    return c.json(
      { message: "Food Court Table uploaded success!", data: insertedData },
      201,
    );
  } catch (error) {
    console.error("Error at /test route", error);
    return c.json({ message: "failed to add food court" }, 500);
  }
});

app.post("/foodCourtTable", foodCourtForm);
app.post("/eventTable", eventFormData);
app.post("/biva-ai", bivaAiChat);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
