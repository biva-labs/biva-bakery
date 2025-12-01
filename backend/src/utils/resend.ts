import { Resend } from "resend";
import { foodCourtEmailTemplate } from "./foodCourtEmailTemplate.ts";
import { type Context } from "hono";
import { sendFoodCourtMail } from "./food-court-mail.ts";
import { sendEventMail } from "./event-mail.ts";
import { sendHotelMail } from "./hotel-mail.ts";

export const resend = new Resend(process.env.RESEND_KEY!);
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

  // switch (body.type) {
  //   case "events": {

  //   }
  // }

  const bodyData = body.userData;

  switch (bodyData.type) {
    case "events":
      const event_res = await sendEventMail(bodyData.data, c);
      if (event_res) {
        return c.json({ message: "success in sending mails!" }, 200);
      } else {
        return c.json({ error: "failed to send messag!" }, 400);
      }
    case "food-court":
      const food_res = await sendFoodCourtMail(bodyData.data, c);
      if (food_res) {
        return c.json(
          { message: "success in sending food court messages!" },
          200,
        );
      } else {
        return c.json({ error: "failed to send messag!" }, 400);
      }
    case "hotel":
      const hotel_res = await sendHotelMail(bodyData.data, c);
      if (hotel_res) {
        return c.json({ message: "success in sending hotel messages!" }, 200);
      } else {
        return c.json({ error: "failed to send messag!" }, 400);
      }
  }
  // console.log("in resend.ts", body.userData.data);
  // console.log("in resend.ts", body.data[0]);
};
