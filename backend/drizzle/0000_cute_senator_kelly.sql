CREATE TABLE "foodCourtTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_table" integer DEFAULT 1 NOT NULL,
	"name" text NOT NULL,
	"total_people" integer DEFAULT 1 NOT NULL,
	"status" text DEFAULT 'available' NOT NULL,
	"aadhar_or_pan_img_url" text NOT NULL,
	"phone_number" text NOT NULL,
	"email" text NOT NULL,
	"food_preference" text DEFAULT 'veg' NOT NULL
);
