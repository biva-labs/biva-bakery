import { pgTable, unique, integer, text, serial } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const adminFoodCourtTable = pgTable("adminFoodCourtTable", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "adminFoodCourtTable_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	tableName: text("table_name").notNull(),
	status: text().notNull(),
}, (table) => [
	unique("adminFoodCourtTable_table_name_key").on(table.tableName),
]);

export const foodCourtTable = pgTable("foodCourtTable", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	totalPeople: integer("total_people").default(1).notNull(),
	status: text().default('available').notNull(),
	aadharOrPanImgUrl: text("aadhar_or_pan_img_url").notNull(),
	phoneNumber: text("phone_number").notNull(),
	email: text().notNull(),
	foodPreference: text("food_preference").default('veg').notNull(),
	timeSlot: text("time_slot").notNull(),
}, (table) => [
	unique("foodCourtTable_phone_number_unique").on(table.phoneNumber),
]);

export const foodCourtEventTable = pgTable("foodCourtEventTable", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	aadharOrPanImgUrl: text("aadhar_or_pan_img_url").notNull(),
	phoneNumber: text("phone_number").notNull(),
	totalPeople: integer("total_people").default(1).notNull(),
	tableId: text("table_id").array().default([""]),
}, (table) => [
	unique("foodCourtEventTable_email_unique").on(table.email),
	unique("foodCourtEventTable_phone_number_unique").on(table.phoneNumber),
]);
