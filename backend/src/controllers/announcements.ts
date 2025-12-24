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

  console.log("announcement data!!: ", formData)

  // Extract images from formData - they come as images[0], images[1], etc.
  const imageFiles: (File | null)[] = [];
  for (let i = 0; i < 4; i++) {
    const file = formData[`images[${i}]`] as File | undefined;
    imageFiles[i] = file && file.size > 0 ? file : null;
  }

  console.log("Extracted image files:", imageFiles.map((f, i) => ({
    position: i,
    hasFile: !!f,
    size: f?.size || 0,
    name: f?.name || 'N/A',
  })));

  // Map displayType to array index: banner=0, modal=1, notification=2, popup=3
  const displayTypeIndexMap: Record<string, number> = {
    banner: 0,
    modal: 1,
    notification: 2,
    popup: 3,
  };

  // First, upload all valid images at their correct positions
  const uploadedUrls: string[] = ["", "", "", ""];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    
    // Skip if file is null or empty
    if (!file) {
      console.log(`Skipping position ${i} - no valid file`);
      continue;
    }

    try {
      console.log(`Uploading file at position ${i}:`, {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });
      
      const uploadedImage = await uploadImage(file, "announcements");
      uploadedUrls[i] = uploadedImage.secure_url || uploadedImage.url || "";
      console.log(`Successfully uploaded to position ${i}:`, uploadedUrls[i]);
    } catch (error) {
      console.error(`Error uploading file at position ${i}:`, error);
      uploadedUrls[i] = "";
    }
  }

  // Now process announcements and assign the correct image URL based on displayType
  const announcementPromises = announcementMetadata.map(async (item: any) => {
    const displayType = item.displayType || "banner";
    const position = displayTypeIndexMap[displayType] ?? 0;
    const imageUrl = uploadedUrls[position] || item.image || "";

    console.log(`Processing announcement (${displayType}):`, {
      position,
      imageUrl,
      hasExistingImage: !!item.image,
    });

    return {
      title: item.title,
      body: item.body,
      image: imageUrl,
      displayType: displayType,
      styling: JSON.stringify(item.styling || {}),
    };
  });

  const announcementData = await Promise.all(announcementPromises);
  await db.delete(announcements);

  if (announcementData.length > 0) {
      const inserted = await db.insert(announcements).values(announcementData).returning();

      return c.json({ message: "Announcements created successfully", data: inserted }, 201);}
} catch (error) {{
    console.error("Error creating announcements:", error);
    return c.json({ message: "Error creating announcements", details: error instanceof Error ? error.message : "Unknown error" }, 500);
};
}});

app.delete("/", async (c: Context) => {
  try {
    const res = await db.delete(announcements).returning();

    return c.json({ message: "deleted successfully", res }, 200);
  }
  catch (err) {
    return c.json({ message: "error deleting!" }, 500);
  }
})

app.get("/", async (c: Context) => {
  try {
    const allAnnouncements = await db.select().from(announcements);

    return c.json(
      {
        data: allAnnouncements,
      },
      200
    );
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return c.json(
      {
        error: "Failed to fetch announcements",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      500
    );
  }
});

export default app;
