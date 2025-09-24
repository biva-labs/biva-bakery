CREATE TABLE "adminHotelRoomReservation" (
	"room_id" serial PRIMARY KEY NOT NULL,
	"room_number" text NOT NULL,
	"type_of_room" text NOT NULL,
	"floor" integer NOT NULL,
	"occupancy" integer NOT NULL,
	"price" integer NOT NULL,
	"occupied" boolean DEFAULT false NOT NULL,
	CONSTRAINT "adminHotelRoomReservation_room_number_unique" UNIQUE("room_number")
);
--> statement-breakpoint
CREATE TABLE "hotelRoomReservation" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" text DEFAULT gen_random_uuid() NOT NULL,
	"room_number" text[] DEFAULT '{}'::text[],
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
ALTER TABLE "foodCourtEventTable" ADD COLUMN "event_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtEventTable" ADD COLUMN "status" text DEFAULT 'available' NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtEventTable" ADD COLUMN "paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtEventTable" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtTable" ADD COLUMN "paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtTable" ADD COLUMN "total_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtTable" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;