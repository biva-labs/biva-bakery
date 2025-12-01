import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { db, get_room_details } from "../db/index.ts";
import { inArray } from "drizzle-orm";
import {
  adminHotelRoomReservation,
  hotelRoomReservation,
} from "../../drizzle/schema.ts";
import { eq } from "drizzle-orm";

export const reserveHotelRoom = async (c: Context) => {
  const body = await c.req.parseBody();
  console.log("HOTEL RESERVE BODY: ", body);
  const imgFile = body["aadhar_or_pan_img_url"];
  let uploadedImage: UploadFileResult | undefined;

  if (imgFile instanceof File) {
    try {
      uploadedImage = await uploadImage(imgFile, "documentImageForVisitors");
    } catch (error) {
      console.error("Image upload failed:", error);
      return c.json({ error: "Image upload failed" }, 500);
    }
  }

  const { name, email, phone_number, total_people, total_days, total_rooms } =
    body;

  let room_type = body["type"];
  const room_price = await db
    .select({ price: adminHotelRoomReservation.price })
    .from(adminHotelRoomReservation)
    .where(eq(adminHotelRoomReservation.typeOfRoom, room_type))
    .limit(1);
  let total_amt = room_price[0].price * total_rooms * total_days;

  const [newReservation] = await db
    .insert(hotelRoomReservation)
    .values({
      name,
      email,
      aadharOrPanImgUrl: uploadedImage?.secure_url!,
      phoneNumber: phone_number,
      totalPeople: total_people,
      totalAmount: total_amt,
      paid: false,
      roomType: body["type"],
      joinDate: body["join_date"],
      leaveDate: body["leave_date"],
    })
    .returning({
      id: hotelRoomReservation.id,
      status: hotelRoomReservation.roomType,
    });

  // await db
  //   .update(adminHotelRoomReservation)
  //   .set({ occupied: true })
  //   .where(inArray(adminHotelRoomReservation.room_number, room_numbers));
  // no need, need to do it manually

  return c.json({
    success: true,
    id: newReservation.id,
    total_amount: total_amt,
    message: "user data stored, havent paid yet!",
  });
};

export const storeUnpaidData = async (c: Context) => {
  const body = await c.req.parseBody();
  const imgFile = body["aadhar_or_pan_img_url"];
  let uploadedImage: UploadFileResult | undefined;

  if (imgFile instanceof File) {
    try {
      uploadedImage = await uploadImage(imgFile, "documentImageForVisitors");
    } catch (error) {
      console.error("Image upload failed:", error);
      return c.json({ error: "Image upload failed" }, 500);
    }
  }

  const { name, email, phone_number, total_people, totalAmount } = body;

  const [newReservation] = await db
    .insert(hotelRoomReservation)
    .values({
      name,
      email,
      aadharOrPanImgUrl: uploadedImage?.secure_url!,
      phoneNumber: phone_number,
      totalPeople: total_people,
      totalAmount,
      paid: false,
      roomType: "PAYMENT_FAILED_FILL_MANUALLY",
      joinDate: body.joinDate,
      leaveDate: body.leaveDate,
    })
    .returning({
      application_id: hotelRoomReservation.applicationId,
      status: hotelRoomReservation.roomType,
    });

  // await db
  //   .update(adminHotelRoomReservation)
  //   .set({ occupied: true })
  //   .where(inArray(adminHotelRoomReservation.room_number, room_numbers));
  // no need, need to do it manually

  return c.json({
    success: true,
    reservation_id: newReservation.application_id,
    message: "user could'nt pay, emergency data sent!",
  });
};

export const getHotelRoomDetails = async (c: Context) => {
  try {
    const room_type = c.req.param("room_type");
    console.log(room_type);

    if (room_type === undefined || room_type.trim() === "") {
      return c.json(
        { error: "Missing required query parameter: room_type" },
        400,
      );
    }
    const res = await get_room_details(room_type);
    if (res) {
      return c.json({ res }, 200);
    }
  } catch (errr) {
    console.error("Error fetching room details:", errr);
    return c.json({ error: "Error fetching room details" }, 500);
  }
};

export const hotelReservation = async (c: Context) => {
  const body = await c.req.json();
  const imgFile = body["aadhar_or_pan_img_url"];
  let uploadedImage: UploadFileResult | undefined;

  if (imgFile instanceof File) {
    try {
      uploadedImage = await uploadImage(imgFile, "documentImageForVisitors");
    } catch (error) {
      console.error("Image upload failed:", error);
      return c.json({ error: "Image upload failed" }, 500);
    }
  }

  const { name, email, phone_number, room_numbers, total_people, totalAmount } =
    body;

  if (!Array.isArray(room_numbers) || room_numbers.length === 0) {
    return c.json({ error: "At least one room number required" }, 400);
  }

  const existingRooms = await db
    .select({
      room_number: adminHotelRoomReservation.room_number,
      occupied: adminHotelRoomReservation.occupied,
    })
    .from(adminHotelRoomReservation)
    .where(inArray(adminHotelRoomReservation.room_number, room_numbers));

  if (existingRooms.length !== room_numbers.length) {
    const foundRooms = new Set(existingRooms.map((r) => r.room_number));
    const missing = room_numbers.filter((rn) => !foundRooms.has(rn));
    return c.json({ error: `Rooms not found: ${missing.join(", ")}` }, 400);
  }

  const occupiedRooms = existingRooms.filter((r) => r.occupied);
  if (occupiedRooms.length > 0) {
    return c.json(
      {
        error: `Rooms already occupied: ${occupiedRooms.map((r) => r.room_number).join(", ")}`,
      },
      400,
    );
  }

  const [newReservation] = await db
    .insert(hotelRoomReservation)
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
    .returning({ application_id: hotelRoomReservation.application_id });

  await db
    .update(adminHotelRoomReservation)
    .set({ occupied: true })
    .where(inArray(adminHotelRoomReservation.room_number, room_numbers));

  return c.json({
    success: true,
    reservation_id: newReservation.application_id,
    message: "new reservation created successfully",
  });
};
