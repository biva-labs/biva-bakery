import { Resend } from "resend";
import { foodCourtEmailTemplate } from "./foodCourtEmailTemplate.ts";
import type { Context } from "hono";

const resend = new Resend(process.env.RESEND_KEY!);
export const sendEmail = async (
  c: Context,
  // userId: string,
  // name: string,
  // amount: string,
  // email: string,
  // preference: string,
  // totalPeople: string,
  // timeSlot: string,
  // subject: string,
) => {
  const body = await c.req.json();

  console.log("in resend.ts", body);

  const { data, error } = await resend.emails.send({
    from: "noreply@thebiva.com",
    to: [
      body.email,
      "db1833@srmist.edu.in",
      "hello@thebiva.com",
      "quickpromoteagency@gmail.com",
    ],
    subject: body.subject,
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
};
