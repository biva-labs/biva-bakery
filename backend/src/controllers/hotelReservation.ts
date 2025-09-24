import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { db } from "../db/index.ts";
import { adminHotelRoomReservation, hotelRoomReservation } from "../db/schema.ts";
import { inArray } from "drizzle-orm";

export const hotelReservation = async (c: Context) => {
    const body = await c.req.json();
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

    const {
        name,
        email,
        phone_number,
        room_numbers,
        total_people,
        totalAmount,
    } = body;

    if (!Array.isArray(room_numbers) || room_numbers.length === 0) {
        return c.json({ error: 'At least one room number required' }, 400);
    }

    const existingRooms = await db.select({
        room_number: adminHotelRoomReservation.room_number,
        occupied: adminHotelRoomReservation.occupied,
    })
        .from(adminHotelRoomReservation)
        .where(
            inArray(adminHotelRoomReservation.room_number, room_numbers)
        );

    if (existingRooms.length !== room_numbers.length) {
        const foundRooms = new Set(existingRooms.map(r => r.room_number));
        const missing = room_numbers.filter(rn => !foundRooms.has(rn));
        return c.json({ error: `Rooms not found: ${missing.join(', ')}` }, 400);
    }

    const occupiedRooms = existingRooms.filter(r => r.occupied);
    if (occupiedRooms.length > 0) {
        return c.json({ error: `Rooms already occupied: ${occupiedRooms.map(r => r.room_number).join(', ')}` }, 400);
    }

    const [newReservation] = await db.insert(hotelRoomReservation)
    .values({
        room_number: room_numbers,
        name,
        email,
        aadhar_or_pan_img_url: uploadImage?.secure_url,
        phone_number,
        total_people,
        total_rooms: room_numbers.length,
        totalAmount,
        paid: false,
    })
    .returning({application_id: hotelRoomReservation.application_id});

    await db.update(adminHotelRoomReservation)
    .set({occupied: true})
    .where(inArray(adminHotelRoomReservation.room_number, room_numbers));

    return c.json({
        success: true,
        reservation_id: newReservation.application_id,
        message: "new reservation created successfully"
    });
}