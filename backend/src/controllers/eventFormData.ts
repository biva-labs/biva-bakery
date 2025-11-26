import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { insertEvent } from "../db/index.ts";
import { db } from "../db/index.ts";
import { adminEventTable } from "../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

interface eventFormData {
  name: string;
  aadhar_or_pan_img_url?: string;
  phone_number: string;
  email: string;
  total_people?: number;
  status: string;
  eventId: string;
  paid: boolean;
  total_amount: number;
}

export const eventFormData = async (c: Context) => {
  try {
    const body = await c.req.parseBody();
    console.log("BODY", body);

    const eventId = body["event_id"] as string;

    const ticket_price_from_db = await db
      .select({ ticket_price: adminEventTable.ticketPrice })
      .from(adminEventTable)
      .where(eq(adminEventTable.eventId, eventId))
      .limit(1);

    const ticket_price: number = ticket_price_from_db[0]?.ticket_price;

    const guests = JSON.parse(body["guest"] as string);
    const guestImages = body["guest_images[]"];
    const mainUserImage = body["aadhar_or_pan_img_url"];

    console.log("Parsed guests:", guests);
    console.log(
      "Guest images count:",
      Array.isArray(guestImages) ? guestImages.length : "Not an array",
    );

    // Prepare all documents for upload
    let documents: File[] = [];
    let data: eventFormData[] = [];

    // Add main user's document
    if (mainUserImage instanceof File) {
      documents.push(mainUserImage);
    }

    // Add guest documents
    if (Array.isArray(guestImages)) {
      guestImages.forEach((img) => {
        if (img instanceof File) {
          documents.push(img);
        }
      });
    }

    console.log("Total documents to upload:", documents.length);

    if (documents.length === 0) {
      return c.json({ error: "No documents found to upload" }, 400);
    }

    try {
      // Upload all documents
      const uploadPromises = documents.map((doc) =>
        uploadImage(doc, "officialDocumentImageForVisitors"),
      );
      const uploadResults: UploadFileResult[] =
        await Promise.all(uploadPromises);

      console.log(
        "Upload results:",
        uploadResults.map((r) => ({
          secure_url: r.secure_url,
          public_id: r.public_id,
        })),
      );

      // Map uploaded results to users
      let resultIndex = 0;

      // Main user data
      const mainUserImageResult = uploadResults[resultIndex++];
      const main_data: eventFormData = {
        eventId: body["event_id"] as string,
        name: body["name"] as string,
        total_people: 1,
        status: "occupied",
        aadhar_or_pan_img_url: mainUserImageResult.secure_url,
        phone_number: body["phone_number"] as string,
        email: body["email"] as string,
        paid: false,
        total_amount: ticket_price,
      };
      data.push(main_data);

      // Guest data with their respective images
      guests.forEach((guest: any) => {
        const guestImageResult = uploadResults[resultIndex++];

        const guestData: eventFormData = {
          eventId: body["event_id"] as string,
          name: guest.name,
          total_people: 1,
          status: "occupied",
          aadhar_or_pan_img_url: guestImageResult?.secure_url || "",
          phone_number: guest.phone_number,
          email: guest.email,
          paid: false,
          total_amount: ticket_price,
        };
        data.push(guestData);
      });

      console.log(
        "Prepared data for insertion:",
        data.map((d) => ({
          name: d.name,
          email: d.email,
          hasImage: !!d.aadhar_or_pan_img_url,
        })),
      );

      // Insert data into database
      const insertedData = await insertEvent(data);

      return c.json(
        {
          message: "Form submitted successfully",
          data: {
            insertedData,
            total_amount: ticket_price * guests.length + ticket_price,
          },
          uploaded_images: uploadResults.map((r) => r.secure_url),
        },
        201,
      );
    } catch (error) {
      console.error("Image upload failed:", error);
      return c.json({ error: "Image upload failed" }, 500);
    }
  } catch (error) {
    console.error("Error processing form:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
