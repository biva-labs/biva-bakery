ALTER TABLE "foodCourtEventTable" ADD COLUMN "table_id" text[] DEFAULT '{}'::text[];--> statement-breakpoint
ALTER TABLE "foodCourtTable" DROP COLUMN "total_table";