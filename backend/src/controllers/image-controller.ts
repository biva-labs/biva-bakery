import type { Context } from "hono";
import { CloudinaryService } from "../utils/cloudinary-service.ts";
import { isGelSchema } from "drizzle-orm/gel-core";
import { countReset } from "console";

const cloudService = new CloudinaryService();

const roomTypes = [
  "suite_room",
  "executive_room",
  "studio_room",
  "deluxe_room",
  "super_deluxe_room",
  "twin_room",
];

type GroupedRooms = {
  public_id: string,
  url: string,
  desc: string,
  price: string
  tag: string,
};

export const getImage = async (c: Context) => {
  try {
    const param = c.req.param("folder") || "";

    if (param.toLowerCase().includes("hotel")) {
      const hotelHero = await cloudService.listImages("hotel-hero", true);
      const hotelEvents = await cloudService.listImages("events", true)
      const hotelGallery = await cloudService.listImages("gallery", true)

      const groupedRoom: GroupedRooms[] = [];

      const taggedImages = await cloudService.listImagesByTags(roomTypes);
      
      taggedImages.forEach((room) => {
        const isTag = room.tags[0];

        if (!isTag) {
          return; // Skip if no tag
        }

        const desc = room.context && room.context.alt ? room.context.alt : "description not available";
        const price = room.context && room.context.Price ? room.context.Price : "no price available"

        groupedRoom.push({
          public_id: room.public_id,
          url: room.secure_url,
          desc: desc,
          price: price,
          tag: isTag,
        });
      });

      console.log(groupedRoom)

      return c.json({
        data: {
          hero: hotelHero.map((img) => ({
            public_id: img.public_id,
            url: img.secure_url,
          })),
        events: hotelEvents.map((img) => ({
          public_id: img.public_id,
          url: img.secure_url,
        })),
        gallery: hotelGallery.map((img) => ({
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
      // const foodCourtTables = await cloudService.listImages(
      //   "food-court-tables",
      //   true,
      // ); // unused for now

      const foodCourtEvents = await cloudService.listImages(
        "events",
        true
      )
      const foodCourtGallery = await cloudService.listImages(
        "gallery",
        true
      )

      return c.json({
        data: {
          hero: foodCourtHero.map((img) => ({
            public_id: img.public_id,
            url: img.secure_url,
          })),
          events: foodCourtEvents.map((img) => ({
            public_id: img.public_id,
            url: img.secure_url,
          })),
          gallery: foodCourtGallery.map((img) => ({
            public_id: img.public_id,
            url: img.secure_url
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
