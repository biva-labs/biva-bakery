import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { db, get_room_details } from "../db/index.ts";
import { count, eq } from "drizzle-orm";
import {
    adminHotelRoomReservation,
    hotelRoomReservation,
} from "../../drizzle/schema.ts";

const MAX_BOOKINGS_PER_EMAIL = 5;

/**
 * Checks how many active bookings exist for a given email.
 * Uses a single aggregate COUNT query — no full row fetch needed.
 */
async function getBookingCountByEmail(email: string): Promise<number> {
    const result = await db
        .select({ total: count() })
        .from(hotelRoomReservation)
        .where(eq(hotelRoomReservation.email, email));
    return result[0]?.total ?? 0;
}

export const reserveHotelRoom = async (c: Context) => {
    const body = await c.req.parseBody();
    // console.log("HOTEL RESERVE BODY: ", body);

    const email = body["email"] as string;

    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }

    // --- 5-booking cap: single COUNT query ---
    const existingCount = await getBookingCountByEmail(email);
    if (existingCount >= MAX_BOOKINGS_PER_EMAIL) {
        return c.json(
            {
                error: `Booking limit reached. A single email can have at most ${MAX_BOOKINGS_PER_EMAIL} room bookings.`,
            },
            400,
        );
    }

    // --- Primary document image (Aadhar / Voter ID) ---
    const primaryImgFile = body["aadhar_or_pan_img_url"];
    let uploadedPrimaryImage: UploadFileResult | undefined;

    if (primaryImgFile instanceof File) {
        try {
            uploadedPrimaryImage = await uploadImage(
                primaryImgFile,
                "documentImageForVisitors",
            );
        } catch (error) {
            console.error("Primary image upload failed:", error);
            return c.json(
                { error: "Primary document image upload failed" },
                500,
            );
        }
    }

    if (!uploadedPrimaryImage) {
        return c.json({ error: "Aadhar / Voter ID image is required" }, 400);
    }

    // --- Secondary document image (optional) ---
    const secondaryImgFile = body["secondary_doc_img_url"];
    let uploadedSecondaryImage: UploadFileResult | undefined;

    if (secondaryImgFile instanceof File) {
        try {
            uploadedSecondaryImage = await uploadImage(
                secondaryImgFile,
                "documentImageForVisitors",
            );
        } catch (error) {
            console.error("Secondary image upload failed:", error);
            return c.json(
                { error: "Secondary document image upload failed" },
                500,
            );
        }
    }

    const name = (body["name"] as string) ?? "";
    const phone_number = (body["phone_number"] as string) ?? "";
    const total_people = (body["total_people"] as string) ?? "1";
    const total_days = (body["total_days"] as string) ?? "1";
    const total_rooms = (body["total_rooms"] as string) ?? "1";
    const room_type = (body["type"] as string) ?? "";

    const room_price = await db
        .select({
            price: adminHotelRoomReservation.price,
            onSale: adminHotelRoomReservation.onSale,
            saleValue: adminHotelRoomReservation.saleValue,
        })
        .from(adminHotelRoomReservation)
        .where(eq(adminHotelRoomReservation.typeOfRoom, room_type))
        .limit(1);

    if (!room_price.length) {
        return c.json({ error: "Room type not found" }, 404);
    }

    const effectivePrice =
        room_price[0].onSale && room_price[0].saleValue != null
            ? room_price[0].saleValue
            : room_price[0].price;

    const total_amt =
        effectivePrice * Number(total_rooms) * Number(total_days);

    const [newReservation] = await db
        .insert(hotelRoomReservation)
        .values({
            name,
            email,
            aadharOrPanImgUrl: uploadedPrimaryImage.secure_url ?? "",
            secondaryDocImgUrl: uploadedSecondaryImage?.secure_url ?? null,
            phoneNumber: phone_number,
            totalPeople: Number(total_people),
            totalAmount: total_amt,
            paid: false,
            roomType: room_type,
            joinDate: (body["join_date"] as string) ?? "",
            leaveDate: (body["leave_date"] as string) ?? "",
        })
        .returning({
            id: hotelRoomReservation.id,
            status: hotelRoomReservation.roomType,
        });

    return c.json({
        success: true,
        id: newReservation.id,
        total_amount: total_amt,
        message: "User data stored, payment not yet completed.",
    });
};

export const storeUnpaidData = async (c: Context) => {
    const body = await c.req.parseBody();

    const email = body["email"] as string;

    if (!email) {
        return c.json({ error: "Email is required" }, 400);
    }

    // --- 5-booking cap: single COUNT query ---
    const existingCount = await getBookingCountByEmail(email);
    if (existingCount >= MAX_BOOKINGS_PER_EMAIL) {
        return c.json(
            {
                error: `Booking limit reached. A single email can have at most ${MAX_BOOKINGS_PER_EMAIL} room bookings.`,
            },
            400,
        );
    }

    // --- Primary document image ---
    const primaryImgFile = body["aadhar_or_pan_img_url"];
    let uploadedPrimaryImage: UploadFileResult | undefined;

    if (primaryImgFile instanceof File) {
        try {
            uploadedPrimaryImage = await uploadImage(
                primaryImgFile,
                "documentImageForVisitors",
            );
        } catch (error) {
            console.error("Primary image upload failed:", error);
            return c.json(
                { error: "Primary document image upload failed" },
                500,
            );
        }
    }

    if (!uploadedPrimaryImage) {
        return c.json({ error: "Aadhar / Voter ID image is required" }, 400);
    }

    // --- Secondary document image (optional) ---
    const secondaryImgFile = body["secondary_doc_img_url"];
    let uploadedSecondaryImage: UploadFileResult | undefined;

    if (secondaryImgFile instanceof File) {
        try {
            uploadedSecondaryImage = await uploadImage(
                secondaryImgFile,
                "documentImageForVisitors",
            );
        } catch (error) {
            console.error("Secondary image upload failed:", error);
            return c.json(
                { error: "Secondary document image upload failed" },
                500,
            );
        }
    }

    const name = (body["name"] as string) ?? "";
    const phone_number = (body["phone_number"] as string) ?? "";
    const total_people = (body["total_people"] as string) ?? "1";
    const totalAmount = (body["totalAmount"] as string) ?? "0";

    const [newReservation] = await db
        .insert(hotelRoomReservation)
        .values({
            name,
            email,
            aadharOrPanImgUrl: uploadedPrimaryImage.secure_url ?? "",
            secondaryDocImgUrl: uploadedSecondaryImage?.secure_url ?? null,
            phoneNumber: phone_number,
            totalPeople: Number(total_people),
            totalAmount: Number(totalAmount),
            paid: false,
            roomType: "PAYMENT_FAILED_FILL_MANUALLY",
            joinDate: (body["join_date"] as string) ?? "",
            leaveDate: (body["leave_date"] as string) ?? "",
        })
        .returning({
            application_id: hotelRoomReservation.applicationId,
            status: hotelRoomReservation.roomType,
        });

    return c.json({
        success: true,
        reservation_id: newReservation.application_id,
        message: "User couldn't pay — emergency data stored.",
    });
};

export const getHotelRoomDetails = async (c: Context) => {
    try {
        const room_type = c.req.param("room_type");
        // console.log(room_type);

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
    } catch (error) {
        console.error("Error fetching room details:", error);
        return c.json({ error: "Error fetching room details" }, 500);
    }
};

/**
 * Legacy / admin endpoint — deprecated, not used in the main booking flow.
 * Room-number-level assignment is now handled manually by admin staff.
 */
export const hotelReservation = async (c: Context) => {
    return c.json(
        {
            error: "This endpoint is deprecated. Use POST /hotel instead.",
        },
        501,
    );
};
