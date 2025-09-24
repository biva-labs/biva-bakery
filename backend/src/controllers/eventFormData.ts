import type { Context } from "hono";
import type { UploadFileResult } from "../utils/cloudinary-service.ts";
import { uploadImage } from "./image-controller.ts";
import { insertEvent } from "../db/index.ts";

interface eventFormData {
    name: string;
    aadhar_or_pan_img_url?: string;
    phone_number: string;
    email: string;
    total_people?: number;
    status: string;
    table_id: string[];
    eventId: string;
    paid: boolean;
    total_amount: number;
}

export const eventFormData = async (c: Context) => {
    try {
        const body = await c.req.parseBody();

        const imgFile = body['aadhar_or_pan_img_url'];
        const ticket_price: number = Number(body['ticket_price']);

        let uploadedImage: UploadFileResult | undefined;
        if (imgFile instanceof File) {
            try {
                uploadedImage = await uploadImage(imgFile, "officialDocumentImageForVisitors")
            } catch (error) {
                console.error('Image upload filed: this is eventformdata.ts line 30', error)
                return c.json({ error: 'image upload failed' });
            }
        }

        const totalPeopleInput = body['total_people'];
        const total_people = totalPeopleInput
            ? Number(totalPeopleInput)
            : undefined;

        if (total_people === undefined ||
            isNaN(total_people) ||
            !Number.isInteger(total_people) ||
            total_people <= 0) {
            throw new Error('Invalid or missing total_people. Must be a positive integer.');
        }

        const tableIdStr = body['table_id'] as string;
        let tableidArr: string[] = [];
        if (tableIdStr) {
            tableidArr = tableIdStr.split(',').map(s => s.trim());
        }

        const tableData: eventFormData = {
            eventId: body['event_id'] as string,
            table_id: tableidArr,
            name: body['name'] as string,
            total_people: body['total_people'] ? Number(body['total_people']) : undefined,
            status: "occupied",
            aadhar_or_pan_img_url: uploadedImage?.secure_url,
            phone_number: body['phone_number'] as string,
            email: body['email'] as string,
            paid: false,
            total_amount: total_people * (ticket_price ? ticket_price : 10)

        };
        const insertedData = await insertEvent(tableData);

        return c.json({ message: 'form submitted sucess', data: insertedData }, 201);
    } catch (error) {
        console.error('Error processing form:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
}