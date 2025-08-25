import type { Context } from "hono";
import { CloudinaryService } from "../utils/cloudinary-service.ts";

const cloudService = new CloudinaryService();

export const getImage = async (c: Context) => {
    try {
        const param = c.req.param('folder') || '';

        if (param.toLowerCase().includes('hotel')) {
            const hotelHero = await cloudService.listImages("hotel-hero", true);
            const hotelRoom = await cloudService.listImages("hotel-rooms", true);

            return c.json({
                data: {
                    hero: hotelHero.map((img) => ({
                        public_id: img.public_id,
                        url: img.secure_url,
                    })),
                    rooms: hotelRoom.map((img) => ({
                        public_id: img.public_id,
                        url: img.secure_url,
                    })),
                },
            });
        }
        else if (param.toLowerCase().includes("food-court")) {
            const foodCourtHero = await cloudService.listImages("food-court-hero", true);
            const foodCourtTables = await cloudService.listImages("food-court-tables", true);

            return c.json({
                data: {
                    hero: foodCourtHero.map((img) => ({
                        public_id: img.public_id,
                        url: img.secure_url,
                    })),
                    events: foodCourtTables.map((img) => ({
                        public_id: img.public_id,
                        url: img.secure_url,
                    })),
                },
            });
        }
        else {
            const images = await cloudService.listImages(param);
            return c.json({
                data: {
                    [param || "images"]: images.map((img) => ({
                        public_id: img.public_id,
                        url: img.secure_url,
                    })),
                },
            });
        }
    } catch (error) {
        console.error('Error listing Cloudinary images:', error);
        return c.json({ error: 'Failed to fetch images' }, 500);
    }
}
