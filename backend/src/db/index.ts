import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { foodCourtEventTable, foodCourtTable } from './schema.js';
import { eq } from 'drizzle-orm';
import { adminFoodCourtTable } from '../../drizzle/schema.ts';

const sql = neon(process.env.NEON_PG_URL!);
export const db = drizzle({ client: sql });
export const schema = { foodCourtTable };

export type NewFoodCourtTable = typeof foodCourtTable.$inferInsert;
export type NewEventTable = typeof foodCourtEventTable.$inferInsert;
type newAdminEventTable = typeof adminFoodCourtTable.$inferInsert;

export const insertFoodCourt = async (data: NewFoodCourtTable): Promise<NewFoodCourtTable> => {
    try {
        const [result] = await db.insert(foodCourtTable).values(data).returning();
        return result
    } catch (error) {
        console.error('Error inserting data:', error);
        throw new Error('Failed to insert food court');
    }
}

export const insertEvent = async (data: NewEventTable): Promise<NewEventTable | null>  => {
    let result: NewEventTable | null = null;

    try {
        await db.transaction(async (tx) => {
            const [eventRes] = await tx.insert(foodCourtEventTable).values(data).returning();
            result = eventRes;

            if (result.table_id) {
                await tx.update(adminFoodCourtTable)
                    .set({ status: 'occupied' })
                    .where(eq(adminFoodCourtTable.tableName, result.table_id))

                console.log(`Event inserted and table '${result.table_id}' marked as occupied.`)
            }

            else {
                // This will cause the transaction to roll back
                throw new Error('New event data is missing a table name.');
            }

        });

        return result;
    } catch (error) {
        console.error('Error during transaction:', error);
       
        throw new Error('Failed to book the event and update the admin table.');
    }
}