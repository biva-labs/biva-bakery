import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { drizzle } from "drizzle-orm/neon-http";
import { foodCourtTable } from "./db.ts";
import { neon } from "@neondatabase/serverless";

import { eq } from "drizzle-orm";

const sql = neon(Deno.env.get("NEON_PG_URL")!);

const db = drizzle(sql);

async function markPaymentPaid(userId: string) {
  try {
    const [updated] = await db
      .update(foodCourtTable)
      .set({ paid: true })
      .where(eq(foodCourtTable.id, parseInt(userId)))
      .returning();

    console.log("Payment updated for userId:", userId);
    return updated;
  } catch (err) {
    console.error("Failed to update payment:", err);
    throw err;
  }
}

async function validateWebhookSignature(
  body: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  if (!body || !signature || !secret) {
    throw new Error(
      "Invalid parameters: expected body, signature, and secret.",
    );
  }

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const hashArray = Array.from(new Uint8Array(sigBuffer));
  const expected = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expected === signature;
}

Deno.serve(async (req: Request) => {
  const rawBody = await req.text();

  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const secret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") ?? "";

  console.log("Signature:", signature);
  console.log("Secret:", secret);
  console.log("Body:", rawBody);

  const isValid = await validateWebhookSignature(rawBody, signature, secret);

  if (!isValid) {
    return new Response("Invalid signature", { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const userId = payload.payload.payment.entity.notes.userId;
  console.log("✅ Verified Razorpay webhook:", payload.event);
  console.log("userId: ", userId);

  switch (payload.event) {
    case "payment.captured":
      await markPaymentPaid(userId);
      console.log("updated successfully for user:", userId);
      break;
    default:
      console.log("Unhandled event:", payload.event);
  }

  return new Response("Pass", { status: 200 });
});
