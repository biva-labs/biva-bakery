import { sql } from "drizzle-orm";
import {
  serial,
  text,
  integer,
  pgTable,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { number } from "zod";

export const foodCourtTable = pgTable("foodCourtTable", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  total_people: integer("total_people").notNull().default(1),
  status: text("status").notNull().default("available"),
  aadhar_or_pan_img_url: text("aadhar_or_pan_img_url").notNull(),
  phone_number: text("phone_number").notNull().unique(),
  email: text("email").notNull(),
  food_preference: text("food_preference").notNull().default("veg"),
  timeSlot: text("time_slot").notNull(),
  paid: boolean("paid").notNull().default(false),
  totalAmount: integer("total_amount").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
});

export const foodCourtEventTable = pgTable("foodCourtEventTable", {
  id: serial("id").primaryKey(),
  eventId: text("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("available"),
  aadhar_or_pan_img_url: text("aadhar_or_pan_img_url").notNull(),
  phone_number: text("phone_number").unique().notNull(),
  total_people: integer("total_people").notNull().default(1),
  paid: boolean("paid").notNull().default(false),
  total_amount: integer("total_amount").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
});

export const hotelRoomReservation = pgTable(
  "hotelRoomReservation",
  {
    id: serial("id").primaryKey(),
    applicationId: text("application_id")
      .default(`gen_random_uuid()`)
      .notNull(),
    name: text().notNull(),
    email: text().notNull(),
    aadharOrPanImgUrl: text("aadhar_or_pan_img_url").notNull(),
    phoneNumber: text("phone_number").notNull(),
    totalPeople: integer("total_people").default(1).notNull(),
    totalRooms: integer("total_rooms").default(1).notNull(),
    paid: boolean().default(false).notNull(),
    totalAmount: integer("total_amount").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    joinDate: text("join_date").notNull(),
    leaveDate: text("leave_date").notNull(),
    roomType: text("room_type").notNull(),
  },
  (table) => [
    unique("hotelRoomReservation_application_id_unique").on(
      table.applicationId,
    ),
    unique("hotelRoomReservation_email_unique").on(table.email),
    unique("hotelRoomReservation_phone_number_unique").on(table.phoneNumber),
  ],
);

export const adminHotelRoomReservation = pgTable("adminHotelRoomReservation", {
  id: serial("room_id").primaryKey(),
  room_number: text("room_number").notNull().unique(),
  type_of_room: text("type_of_room").notNull(),
  floor: integer("floor").notNull(),
  // available_room: integer("available_room").notNull().default(1),
  occupancy: integer("occupancy").notNull(),
  price: integer("price").notNull(),
  occupied: boolean("occupied").notNull().default(false),
});
