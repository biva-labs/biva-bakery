import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { foodCourtEventTable, foodCourtTable } from "./schema.ts";
import { eq, and } from "drizzle-orm";
import { adminFoodCourtTable } from "../../drizzle/schema.ts";

const sql = neon(process.env.NEON_PG_URL!);
export const db = drizzle({ client: sql });
export const schema = { foodCourtTable };

export type NewFoodCourtTable = typeof foodCourtTable.$inferInsert;
export type NewEventTable = typeof foodCourtEventTable.$inferInsert;
type newAdminEventTable = typeof adminFoodCourtTable.$inferInsert;

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
): Promise<NewEventTable | null> => {
  try {
    const tableIdArray = Array.isArray(data.table_id)
      ? data.table_id
      : [data.table_id];

    const [inserted] = await db
      .insert(foodCourtEventTable)
      .values({
        ...data,
        table_id: tableIdArray,
      })
      .returning();

    console.log(`Event inserted with table IDs: [${tableIdArray.join(", ")}]`);
    return inserted;
  } catch (error) {
    console.error("Error inserting event:", error);
    throw new Error("Failed to book the event.");
  }
};

export const updateAfterPayment = async (userId: string) => {
  try {
    const res = await db
      .update(foodCourtTable)
      .set({ paid: true })
      .where(eq(foodCourtTable.id, parseInt(userId)))
      .returning();

    console.log(`Payment marked as paid for user ID: ${userId}`);
    return res[0];
  } catch (error) {
    console.error("Error inserting event:", error);
    throw new Error("Failed to book the event.");
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
