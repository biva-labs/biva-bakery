import { PgTable, serial, text, integer, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable('tables', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    shape: text('shape').notNull(),
    seats: integer('seats').notNull(),
    status: text('status').notNull().default('available')
});