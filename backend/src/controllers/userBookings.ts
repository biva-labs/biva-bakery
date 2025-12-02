import type { Context } from "hono/jsx";
import { PgTable } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import {
  foodCourtEventTable,
  foodCourtTable,
  hotelRoomReservation,
} from "../../drizzle/schema.ts";

async function getBookingsByEmail<T extends PgTable>(
  table: T,
  emailColumn: T["_"]["columns"][string],
  email: string,
) {
  return db.select().from(table).where(eq(emailColumn, email));
}

export async function getUserBookings(c: Context) {
  try {
    const body = await c.req.parseBody();
    const userEmail = body["email"];

    if (!userEmail) {
      return c.json({ error: "Email is required." }, 400);
    }
    const [eventData, foodCourtData, hotelData] = await Promise.all([
      getBookingsByEmail(
        foodCourtEventTable,
        foodCourtEventTable.email,
        userEmail,
      ),
      getBookingsByEmail(foodCourtTable, foodCourtTable.email, userEmail),
      getBookingsByEmail(
        hotelRoomReservation,
        hotelRoomReservation.email,
        userEmail,
      ),
    ]);

    const resData = {
      events: eventData,
      foodCourts: foodCourtData,
      hotels: hotelData,
    };

    return c.json({ data: resData }, 200);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return c.json({ error: "An internal server error occurred." }, 500);
  }
}
