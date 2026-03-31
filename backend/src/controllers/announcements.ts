import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { Hono } from "hono";
import { db } from "../db/index.ts";
import { announcements } from "../../drizzle/schema.ts";
import { title } from "process";

const app = new Hono();

app.post("/", async (c: Context) => {
	try {
		const formData = await c.req.parseBody();
		const payloadRaw = formData["payload"] as string;
		const announcementMetadata = JSON.parse(payloadRaw);

		// console.log("announcement data!!: ", formData);

		// Extract images from formData - they come as images[0], images[1], images[2], images[3]
		const files: (File | undefined)[] = [
			formData["images[0]"] as File | undefined,
			formData["images[1]"] as File | undefined,
			formData["images[2]"] as File | undefined,
			formData["images[3]"] as File | undefined,
		];

		// Upload images and store URLs at their respective positions
		// 0=banner, 1=modal, 2=notification, 3=popup
		const uploadedUrls: string[] = ["", "", "", ""];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			// Skip if file is empty, undefined, or not a valid File object with content
			if (!file || !(file instanceof File) || file.size === 0) {
				console.log(
					`Skipping position ${i} - no valid file (size: ${file?.size || 0})`,
				);
				continue;
			}

			try {
				console.log(`Uploading file at position ${i}:`, {
					fileName: file.name,
					fileSize: file.size,
					fileType: file.type,
				});

				const uploadedImage = await uploadImage(file, "announcements");
				uploadedUrls[i] =
					uploadedImage.secure_url || uploadedImage.url || "";
				console.log(
					`Successfully uploaded to position ${i}:`,
					uploadedUrls[i],
				);
			} catch (error) {
				console.error(`Error uploading file at position ${i}:`, error);
				uploadedUrls[i] = "";
			}
		}

		// Process announcements - they're already in order: banner, modal, notification, popup
		const announcementData = announcementMetadata.map(
			(item: any, index: number) => {
				const imageUrl = uploadedUrls[index] || item.image || "";

				console.log(
					`Processing announcement ${index} (${item.displayType}):`,
					{
						imageUrl,
						hasUploadedImage: !!uploadedUrls[index],
						hasExistingImage: !!item.image,
					},
				);

				return {
					title: item.title,
					body: item.body,
					image: imageUrl,
					displayType: item.displayType || "banner",
					styling: JSON.stringify(item.styling || {}),
				};
			},
		);
		await db.delete(announcements);

		if (announcementData.length > 0) {
			const inserted = await db
				.insert(announcements)
				.values(announcementData)
				.returning();

			return c.json(
				{ message: "Announcements created successfully", data: inserted },
				201,
			);
		}
	} catch (error) {
		{
			console.error("Error creating announcements:", error);
			return c.json(
				{
					message: "Error creating announcements",
					details:
						error instanceof Error ? error.message : "Unknown error",
				},
				500,
			);
		}
	}
});

app.delete("/", async (c: Context) => {
	try {
		const res = await db.delete(announcements).returning();

		return c.json({ message: "deleted successfully", res }, 200);
	} catch (err) {
		return c.json({ message: "error deleting!" }, 500);
	}
});

app.get("/", async (c: Context) => {
	try {
		const allAnnouncements = await db.select().from(announcements);

		return c.json(
			{
				data: allAnnouncements,
			},
			200,
		);
	} catch (error) {
		console.error("Error fetching announcements:", error);
		return c.json(
			{
				error: "Failed to fetch announcements",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			500,
		);
	}
});

export default app;
