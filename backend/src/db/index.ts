import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { foodCourtTable } from './schema.js';

const sql = neon(process.env.NEON_PG_URL!);
export const db = drizzle({client: sql});
export const schema = {foodCourtTable};
export type NewFoodCourt = typeof foodCourtTable.$inferInsert;

export const insertFoodCourt = async(data: NewFoodCourt) : Promise<NewFoodCourt> => {
        try {
            const [result] = await db.insert(foodCourtTable).values(data).returning();
            return result
        } catch(error) {
            console.error('Error inserting data:', error);
            throw new Error('Failed to insert food court');
        }
}