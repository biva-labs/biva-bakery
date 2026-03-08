import type { Context } from "hono/jsx";
import { hotelEmailTemplate } from "./hotelEmailTemplate.ts";
import { resend } from "./resend.ts";

export async function sendHotelMail(body: any, c: Context) {
	console.log("HOTEL-MAIL.TS 6", body);
	const { data, error } = await resend.emails.send({
		from: "noreply@thebiva.com",
		to: [
			body[0].email,
			"hello@thebiva.com",
			"hotelbiva@gmail.com",
			"bivafrontdesk@gmail.com",
		],
		subject: "invoice",
		html: hotelEmailTemplate(
			body[0].name,
			body[0].totalAmount,
			body[0].email,
			body[0].id,
			body[0].totalRooms,
			body[0].totalPeople,
			body[0].roomType,
			body[0].joinDate,
			body[0].leaveDate,
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
