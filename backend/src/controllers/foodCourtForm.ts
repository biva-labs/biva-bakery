import type { Context } from "hono";
import { uploadImage } from "./image-controller.ts";
import { db, insertFoodCourt } from "../db/index.ts";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";

interface FoodCourtFormData {
  name: string;
  aadhar_or_pan_img_url?: string;
  phone_number: string;
  email: string;
  timeSlot: string;
  // total_table?: number;
  total_people?: number;
  food_preference?: string;
}



export const foodCourtForm = async (c: Context) => {
  try {
    const body = await c.req.parseBody();

    const imgFile = body['aadhar_or_pan_img_url'];

    let uploadedImage: UploadFileResult | undefined;
    if (imgFile instanceof File) {
      try {
        uploadedImage = await uploadImage(imgFile, "documentImageForVisitors");
      } catch (error) {
        console.error('Image upload failed:', error);
        return c.json({ error: 'Image upload failed' }, 500);
      }
    }

    const tableData: FoodCourtFormData = {
      name: body['name'] as string,
      total_people: body['total_people'] ? Number(body['total_people']) : undefined,
      aadhar_or_pan_img_url: uploadedImage?.secure_url,
      phone_number: body['phone_number'] as string,
      email: body['email'] as string,
      timeSlot: body['timeSlot'] as string, // Added timeSlot from the form
      food_preference: body['food_preference'] as string,
    };

    // The data object to be inserted into the database
    console.log("Data to insert:", tableData);

    const insertedData = await insertFoodCourt(tableData);
    
    return c.json({ message: 'Form submitted successfully', data: insertedData }, 201);
  } catch (error) {
    console.error('Error processing form:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
};