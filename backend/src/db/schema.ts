import { sql } from "drizzle-orm";
import {serial, text, integer, pgTable} from "drizzle-orm/pg-core";

export const foodCourtTable = pgTable('foodCourtTable', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  total_people: integer('total_people').notNull().default(1),
  status: text('status').notNull().default('available'),
  aadhar_or_pan_img_url: text('aadhar_or_pan_img_url').notNull(),
  phone_number: text('phone_number').notNull().unique(),
  email: text('email').notNull(),
  food_preference: text('food_preference').notNull().default("veg"),
  timeSlot: text("time_slot").notNull(),
});

export const foodCourtEventTable = pgTable('foodCourtEventTable', {
    id: serial('id').primaryKey(),
    table_id: text('table_id').notNull().array().default(sql`'{}'::text[]`),
    name: text('name').notNull(),
    email: text("email").notNull().unique(),
    aadhar_or_pan_img_url: text('aadhar_or_pan_img_url').notNull(),
    phone_number: text("phone_number").unique().notNull(),
    total_people: integer('total_people').notNull().default(1),
});

