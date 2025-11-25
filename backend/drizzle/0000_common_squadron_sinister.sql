-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'employee', 'media-handler');--> statement-breakpoint
CREATE TABLE "hotelRoomReservation" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" text DEFAULT gen_random_uuid() NOT NULL,
	"room_number" text[] DEFAULT '{""}',
	"name" text NOT NULL,
	"email" text NOT NULL,
	"aadhar_or_pan_img_url" text NOT NULL,
	"phone_number" text NOT NULL,
	"total_people" integer DEFAULT 1 NOT NULL,
	"total_rooms" integer DEFAULT 1 NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"total_amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "hotelRoomReservation_application_id_unique" UNIQUE("application_id"),
	CONSTRAINT "hotelRoomReservation_room_number_unique" UNIQUE("room_number"),
	CONSTRAINT "hotelRoomReservation_email_unique" UNIQUE("email"),
	CONSTRAINT "hotelRoomReservation_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "adminHotelRoomReservation" (
	"room_id" serial PRIMARY KEY NOT NULL,
	"room_number" text NOT NULL,
	"type_of_room" text NOT NULL,
	"floor" integer NOT NULL,
	"occupancy" integer NOT NULL,
	"price" integer NOT NULL,
	"occupied" boolean DEFAULT false NOT NULL,
	"room-image" text NOT NULL,
	CONSTRAINT "adminHotelRoomReservation_room_number_unique" UNIQUE("room_number")
);
--> statement-breakpoint
CREATE TABLE "adminEventTable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name ""adminFoodCourtTable_id_seq"" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1),
	"event_id" text NOT NULL,
	"event_name" text NOT NULL,
	"group_name" text NOT NULL,
	"ticket_price" integer DEFAULT 0 NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"banner" text NOT NULL,
	CONSTRAINT "adminFoodCourtTable_table_name_key" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "foodCourtTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"total_people" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'available' NOT NULL,
	"aadhar_or_pan_img_url" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"food_preference" text DEFAULT 'veg' NOT NULL,
	"time_slot" text NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"total_amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "foodCourtTable_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "foodCourtEventTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"aadhar_or_pan_img_url" text NOT NULL,
	"phone_number" text NOT NULL,
	"total_people" integer DEFAULT 1 NOT NULL,
	"event_id" text NOT NULL,
	"status" text DEFAULT 'available' NOT NULL,
	"paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"total_amount" integer NOT NULL,
	CONSTRAINT "foodCourtEventTable_email_unique" UNIQUE("email"),
	CONSTRAINT "foodCourtEventTable_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"role" "role" DEFAULT 'employee' NOT NULL,
	"phone" text DEFAULT '' NOT NULL,
	"aadhar_img_url" text DEFAULT '' NOT NULL,
	"image" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
*/