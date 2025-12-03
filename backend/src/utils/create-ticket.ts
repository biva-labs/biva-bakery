import type { Context } from "hono";
import { db } from "../db/index.ts";
import { ticket } from "../../drizzle/schema.ts";

export default async function createTicket(c: Context) {
    const body = await c.req.parseBody();

    const ticketData = {
        name: body["name"] as string,
        email: body["email"] as string,
        phone: body["phone"] as string,
        category: body["category"] as string,
        subject: body["subject"] as string,
        description: body["description"] as string,
    };

    try {
        const [result] = await db.insert(ticket).values(ticketData).returning();
        return c.json(
            { message: "Form submitted successfully", data: result },
            201,
        );
    } catch (error) {
        console.error("Error inserting data:", error);
        return c.json({ error: "Internal server error" }, 500);
    }
}
