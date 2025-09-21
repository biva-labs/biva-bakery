CREATE TABLE "foodCourtEventTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"aadhar_or_pan_img_url" text NOT NULL,
	"phone_number" text NOT NULL,
	"total_people" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "foodCourtEventTable_email_unique" UNIQUE("email"),
	CONSTRAINT "foodCourtEventTable_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
ALTER TABLE "foodCourtTable" ADD COLUMN "time_slot" text NOT NULL;--> statement-breakpoint
ALTER TABLE "foodCourtTable" ADD CONSTRAINT "foodCourtTable_phone_number_unique" UNIQUE("phone_number");