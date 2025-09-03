import type { Context } from "hono";
import { CloudinaryService } from "../utils/cloudinary-service.ts";

const cloudService = new CloudinaryService();

const roomTypes = [
  "suite_room",
  "executive_room",
  "studio_room",
  "deluxe_room",
  "queen_room",
  "twin_room",
];

export const getImage = async (c: Context) => {
  try {
    const param = c.req.param("folder") || "";

    if (param.toLowerCase().includes("hotel")) {
      const hotelHero = await cloudService.listImages("hotel-hero", true);

      const groupedRoom: {
        [key: string]: any[]
      } = {};
      
      for(const roomType of roomTypes) {
        const taggedImages = await cloudService.listImagesByTag(roomType);
        groupedRoom[roomType] = taggedImages.map((img) => ({
          public_id: img.public_id,
          url: img.secure_url,
        }));
      }

      return c.json({
        data: {
          hero: hotelHero.map((img) => ({
            public_id: img.public_id,
            url: img.secure_url,
          })),
          rooms: groupedRoom,
        },
      });
    } else if (param.toLowerCase().includes("food-court")) {
      const foodCourtHero = await cloudService.listImages(
        "food-court-hero",
        true,
      );
      const foodCourtTables = await cloudService.listImages(
        "food-court-tables",
        true,
      );

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
    } else {
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
    console.error("Error listing Cloudinary images:", error);
    return c.json({ error: "Failed to fetch images" }, 500);
  }
};
