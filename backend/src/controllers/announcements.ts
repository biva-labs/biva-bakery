import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { Hono } from "hono";
import { db } from "../db/index.ts";
import { announcements } from "../../drizzle/schema.ts";

const app = new Hono();

app.post("/", async (c: Context) => {
  try {
    const formData = await c.req.parseBody();
    let imageUrl = "";

    // Handle optional file upload
    const file = formData["image"];

    if (file instanceof File) {
      const uploadedImage: UploadFileResult | undefined = await uploadImage(
        file,
        "announcements"
      );

      if (!uploadedImage?.secure_url) {
        return c.json(
          { error: "Image upload did not return a valid URL" },
          500
        );
      }

      imageUrl = uploadedImage.secure_url;
    }

    const title = formData["title"] as string;
    const bodyText = formData["body"] as string;
    const displayType = formData["displayType"] as string;
    const stylingString = formData["styling"] as string;

    if (!title || !bodyText || !displayType) {
      return c.json(
        { error: "Missing required fields: title, body, or displayType" },
        400
      );
    }


    let stylingData;
    try {
      stylingData = stylingString ? JSON.parse(stylingString) : {};
    } catch (parseError) {
      return c.json(
        { error: "Invalid JSON format for styling field" },
        400
      );
    }

    await db.delete(announcements);

    const [updatedAnnouncement] = await db
      .insert(announcements)
      .values({
        title,
        body: bodyText,
        displayType,
        image: imageUrl,
        styling: JSON.stringify(stylingData),
      })
      .returning();

    return c.json(
      {
        message: "Announcement updated successfully",
        data: updatedAnnouncement,
      },
      200
    );
  } catch (error) {
    console.error("Error creating announcement:", error);
    return c.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      500
    );
  }
});

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
