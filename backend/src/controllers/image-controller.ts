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

type GroupedRooms = {
  public_id: string,
  url: string,
  tag: string
};

export const getImage = async (c: Context) => {
  try {
    const param = c.req.param("folder") || "";

    if (param.toLowerCase().includes("hotel")) {
      const hotelHero = await cloudService.listImages("hotel-hero", true);

      const groupedRoom: GroupedRooms[] = [];


      const taggedImages = await cloudService.listImagesByTags(roomTypes);


      taggedImages.map((room) => {
        const isTag = room.tags[0];



        if (!isTag) {
          return; // Skip if no tag
        }

        groupedRoom.push({
          public_id: room.public_id,
          url: room.secure_url,
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
