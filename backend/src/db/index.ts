import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { table } from './schema.js';

const sql = neon(process.env.NEON_PG_URL!);
export const db = drizzle({client: sql});
export const schema = {table};