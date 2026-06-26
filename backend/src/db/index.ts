import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { foodCourtEventTable, foodCourtTable } from "./schema.ts";
import { eq, and, inArray } from "drizzle-orm";
import {
	adminHotelRoomReservation,
	hotelRoomReservation,
} from "../../drizzle/schema.ts";

const sql = neon(process.env.NEON_PG_URL!);
export const db = drizzle({ client: sql });
export const schema = { foodCourtTable };

export type NewFoodCourtTable = typeof foodCourtTable.$inferInsert;
export type NewEventTable = typeof foodCourtEventTable.$inferInsert;
type newAdminEventTable = typeof foodCourtTable.$inferInsert;

export const insertFoodCourt = async (
	data: NewFoodCourtTable,
): Promise<NewFoodCourtTable> => {
	try {
		const [result] = await db.insert(foodCourtTable).values(data).returning();
		return result;
	} catch (error) {
		console.error("Error inserting data:", error);
		throw new Error("Failed to insert food court");
	}
};

export const insertEvent = async (
	data: NewEventTable,
): Promise<NewEventTable[] | null> => {
	try {
		const inserted = await db
			.insert(foodCourtEventTable)
			.values(data)
			.returning();
		return inserted;
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		console.error("Error inserting event:", error);
		throw new Error(`Failed to book the event: ${message}`);
	}
};

export const get_room_details = async (room_type: string) => {
	const [occupied, unoccupied] = await db.batch([
		db
			.select()
			.from(hotelRoomReservation)
			.where(eq(hotelRoomReservation.roomType, room_type)),

		db
			.select()
			.from(adminHotelRoomReservation)
			.where(
				and(
					eq(adminHotelRoomReservation.typeOfRoom, room_type),
					// eq(adminHotelRoomReservation.occupied, false),
				),
			),
	]);
	return {
		occupied,
		unoccupied,
	};
};

export const updateAfterPayment = async (userId: string) => {
	try {
		const res = await db
			.update(foodCourtTable)
			.set({ paid: true })
			.where(eq(foodCourtTable.id, parseInt(userId)))
			.returning();

		// console.log(`Payment marked as paid for user ID: ${userId}`);
		return res[0];
	} catch (error) {
		console.error("Error inserting event:", error);
		throw new Error("Failed to book the event.");
	}
};

export const updateEventAfterPayment = async (userIds: number[]) => {
	try {
		const res = await db
			.update(foodCourtEventTable)
			.set({ paid: true })
			.where(inArray(foodCourtEventTable.id, userIds))
			.returning();

		return res;
	} catch (error) {
		console.error("Error updating event payment:", error);
		throw new Error("Failed to update payment status.");
	}
};

export const checkEventData = async (email: string) => {
	try {
		const result = await db
			.select()
			.from(foodCourtEventTable)
			.where(eq(foodCourtEventTable.email, email));

		if (result.length > 0) {
			return result;
		}
		return false;
	} catch (err: any) {
		console.error("Database error:", err);
		throw err;
	}
};

export const checkEventDataByPhone = async (phone_number: string) => {
	try {
		const result = await db
			.select()
			.from(foodCourtEventTable)
			.where(eq(foodCourtEventTable.phone_number, phone_number))
			.limit(1);

		if (result.length > 0) {
			return result;
		}
		return false;
	} catch (err: any) {
		console.error("Database error:", err);
		throw err;
	}
};

export const checkFoodCourtData = async (
	email: string,
	phone_number: string,
) => {
	try {
		const result = await db
			.select()
			.from(foodCourtTable)
			.where(
				and(
					eq(foodCourtTable.email, email),
					eq(foodCourtTable.phone_number, phone_number),
					eq(foodCourtTable.paid, false),
				),
			)
			.limit(1);

		if (result.length > 0) {
			return result;
		}
		return false;
	} catch (err: any) {
		console.error("Database error:", err);
		throw err;
	}
};
