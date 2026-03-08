import type { Context } from "hono/jsx";
import { foodCourtEmailTemplate } from "./foodCourtEmailTemplate.ts";
import { resend } from "./resend.ts";

export async function sendFoodCourtMail(body: any, c: Context<any>) {
	const { data, error } = await resend.emails.send({
		from: "noreply@thebiva.com",
		to: [
			body.email,
			"hello@thebiva.com",
			"hotelbiva@gmail.com",
			"bivafrontdesk@gmail.com",
		],
		subject: "invoice",
		html: foodCourtEmailTemplate(
			body.amount,
			body.name,
			body.email,
			body.userId,
			body.preference,
			body.timeSlot,
			body.totalPeople,
		),
	});

	if (error) {
		console.log(error);
		return c.json({ error: error }, 400);
	} else {
		console.log("resend got it", data);
		return c.json({ success: "message delivered!" }, 200);
	}
}
