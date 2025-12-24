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

  const filesRaw = formData["images"];
  const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

  const announcementPromises = announcementMetadata.map(async (item: any, i: number) => {
    let imageUrl = item.image || "";

    const file = files[i];
    console.log(`Processing announcement ${i}:`, {
      hasFile: !!file,
      isFileInstance: file instanceof File,
      fileName: file instanceof File ? file.name : 'N/A',
      fileSize: file instanceof File ? file.size : 'N/A',
      fileType: file instanceof File ? file.type : typeof file,
    });

    if (file instanceof File && file.size > 0) {
      const uploadedImage = await uploadImage(file, "announcements");
      imageUrl = uploadedImage.secure_url || "";
    }

    return {
      title: item.title,
      body: item.body,
      image: imageUrl,
      displayType: item.displayType || "banner",
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
