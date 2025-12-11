import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { announce_data } from "../index.ts";
import type { announce_data_type } from "../index.ts";
import { Hono } from "hono";

const app = new Hono();

app.post("/", async (c: Context) => {
  const body = await c.req.parseBody();

  try {
    // Handle optional file
    const file = body["image"];
    let uploadedImage: UploadFileResult | undefined;

    if (file instanceof File) {
      uploadedImage = await uploadImage(file, "announcements");

      if (!uploadedImage?.secure_url) {
        return c.json(
          { error: "Image upload did not return a valid URL" },
          500,
        );
      }

      announce_data.image = uploadedImage.secure_url;
    } else {
      announce_data.image = "";
    }

    // Assign basic fields
    announce_data.title = body["title"] as string;
    announce_data.body = body["body"] as string;
    announce_data.displayType = body["displayType"] as string;

    // Parse styling safely
    try {
      announce_data.styling = JSON.parse(body["styling"] as string);
    } catch {
      return c.json({ error: "Invalid styling JSON" }, 400);
    }

    return c.json(
      {
        message: "Announcement updated successfully",
        data: announce_data,
      },
      201,
    );
  } catch (error) {
    console.error("Error in announcement:", error);
    return c.json({ error: "Server error" }, 500);
  }
});

app.get("/", async (c: Context) => {
  return c.json({ data: announce_data }, 200);
});

export default app;
