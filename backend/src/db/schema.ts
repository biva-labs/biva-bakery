import { sql } from "drizzle-orm";
import { serial, text, integer, pgTable, boolean, timestamp } from "drizzle-orm/pg-core";

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
  paid: boolean("paid").notNull().default(false),
  totalAmount: integer("total_amount").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const foodCourtEventTable = pgTable('foodCourtEventTable', {
  id: serial('id').primaryKey(),
  eventId: text('event_id').notNull(),
  table_id: text('table_id').notNull().array().default(sql`'{}'::text[]`),
  name: text('name').notNull(),
  email: text("email").notNull().unique(),
  status: text('status').notNull().default('available'),
  aadhar_or_pan_img_url: text('aadhar_or_pan_img_url').notNull(),
  phone_number: text("phone_number").unique().notNull(),
  total_people: integer('total_people').notNull().default(1),
  paid: boolean("paid").notNull().default(false),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const hotelRoomReservation = pgTable("hotelRoomReservation", {
  id: serial('id').primaryKey(), // db
  application_id: text('application_id').unique().notNull().default(sql`gen_random_uuid()`),
  room_number: text('room_number').notNull().array().default(sql`'{}'::text[]`).unique(), // fr
  // room_number: text('room_number').notNull(),
  name: text('name').notNull(), // fr
  email: text("email").notNull().unique(), // fr
  // status: text('status').notNull(),
  aadhar_or_pan_img_url: text('aadhar_or_pan_img_url').notNull(), // fr + be
  phone_number: text("phone_number").unique().notNull(), // fr
  total_people: integer('total_people').notNull().default(1), // be
  total_rooms: integer('total_rooms').notNull().default(1), //be
  // type_of_room: text("type_of_room").notNull(),
  paid: boolean("paid").notNull().default(false), // be + wh
  totalAmount: integer("total_amount").notNull(), // fr
  createdAt: timestamp("created_at").notNull().default(sql`now()`), // be
})

export const adminHotelRoomReservation = pgTable("adminHotelRoomReservation", {
  id: serial('room_id').primaryKey(),
  room_number: text('room_number').notNull().unique(),
  type_of_room: text("type_of_room").notNull(),
  floor: integer("floor").notNull(),
  // available_room: integer("available_room").notNull().default(1),
  occupancy: integer('occupancy').notNull(),
  price: integer('price').notNull(),
  occupied: boolean('occupied').notNull().default(false),
})