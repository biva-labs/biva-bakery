import { resend } from "./resend.ts";
import type { Context } from "hono/jsx";
import { db } from "../db/index.ts";
import { adminEventTable } from "../../drizzle/schema.ts";
import { eq } from "drizzle-orm";
import { eventEmailTemplate } from "./eventEmailTemplate.ts";

export async function sendEventMail(body: any, c: Context) {
	// (Assuming this part is correct)
	const [eventData] = await db
		.select()
		.from(adminEventTable)
		.where(eq(body[0].eventId, adminEventTable.eventId));

	if (!eventData) {
		return c.json({ error: "Event not found" }, 404);
	}

	try {
		// 1. Create an array of promises for sending emails
		const emailPromises = body.map(async (data) => {
			const { data: res, error } = await resend.emails.send({
				from: "noreply@thebiva.com",
				to: [
					data.email,
					"hello@thebiva.com",
					"hotelbiva@gmail.com",
					"bivafrontdesk@gmail.com",
				],
				subject: "invoice",
				html: eventEmailTemplate(
					data.name,
					data.total_amount,
					eventData.banner,
					data.id,
					eventData.eventName,
					data.email,
					eventData.groupName,
					eventData.date,
					eventData.time,
				),
			});

			// 2. Log the outcome, but DO NOT return a response here
			if (error) {
				console.error(`Failed to send email to ${data.email}:`, error);
				// Throw an error to be caught by the catch block below
				throw new Error(
					`Failed to send email to ${data.email}: ${error.message}`,
				);
			}

			console.log(`Email successfully sent to ${data.email}`, res);
			// Return the result for Promise.all, but not a Hono response
			return res;
		});

		// 3. Wait for ALL promises to complete
		await Promise.all(emailPromises);

		// 4. AFTER all emails are sent, return the final success response
		console.log("All emails processed successfully.");
		return c.json({ success: "All messages delivered!" }, 200);
	} catch (error: any) {
		// 5. If any email failed, the catch block will execute
		console.error(
			"An error occurred during the email sending process:",
			error.message,
		);
		return c.json({ error: error.message }, 500);
	}
}
