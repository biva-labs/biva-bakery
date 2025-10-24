import type { Context } from "hono";
import {
  CloudinaryService,
  type UploadFileResult,
} from "../utils/cloudinary-service.ts";

const MAX_BYTES = 5 * 1024 * 1024;

const cloudService = new CloudinaryService();

type BakeryItem = {
  title: string;
  public_id: string;
  url: string;
  desc: string;
};

type GroupedBakeryItems = {
  bread: BakeryItem[];
  biscuit: BakeryItem[];
  rusk: BakeryItem[];
  puff_and_snacks: BakeryItem[];
};

const bakeryTypes = ["bread", "biscuit", "rusk", "puff_and_snacks"];

type GroupedRooms = {
  public_id: string;
  url: string;
  desc: string;
  price: string;
  room_id: string | undefined;
  room_type: string | undefined;
};

type HotelHero = {
  public_id: string;
  url: string;
  position: string;
};

export const getImage = async (c: Context) => {
  try {
    const param = c.req.param("folder") || "";

    if (param.toLowerCase().includes("hotel")) {

      const HotelHeroItems = await cloudService.listByMetadata(
        "position",
        "hero",
        param,
      );
      const HotelBanquetItems = await cloudService.listByMetadata(
        "position",
        "banquet",
        param,
      );

      const hero: HotelHero[] = HotelHeroItems.map((itm) => ({
        public_id: itm.public_id,
        url: itm.secure_url,
        position: itm.context.position,
      }));
      const banquet: HotelHero[] = HotelBanquetItems.map((itm) => ({
        public_id: itm.public_id,
        url: itm.secure_url,
        position: itm.context.position,
      }));
      const hotelEvents = await cloudService.listImages("events", true);
      const hotelGallery = await cloudService.listImages("gallery", true);
      const hotelRooms = await cloudService.listByMetadata(
        "position",
        "rooms",
        "hotel-rooms",
      );
      // const groupedRoom: GroupedRooms[] = [];

      // const taggedImages = await cloudService.listImagesByTags(roomTypes);
      // console.log("Tagged images", taggedImages);

      // taggedImages.forEach((room) => {
      //   const isTag = room.tags[0];

      //   if (!isTag) {
      //     return; // Skip if no tag
      //   }

      //   const desc =
      //     room.context && room.context.alt
      //       ? room.context.alt
      //       : "description not available";
      //   const price =
      //     room.context && room.context.Price
      //       ? room.context.Price
      //       : "no price available";

      //   groupedRoom.push({
      //     public_id: room.public_id,
      //     url: room.secure_url,
      //     desc: desc,
      //     price: price,
      //     tag: isTag,
      //   });
      // });

      // console.log("gp", groupedRoom);

      const rooms: GroupedRooms[] = hotelRooms.map((itm) => ({
        public_id: itm.public_id,
        url: itm.secure_url,
        desc: itm.context?.description ?? "description not available",
        price: itm.context?.price ?? "no price available",
        room_id: itm.context?.id,
        room_type: itm.context?.room_type,
        room_number: itm.context?.room_number,
        position: itm.context?.position,
      }));

      return c.json({
        data: {
          hero: hero,
          events: hotelEvents.map((img) => ({
            event_id: img.context?.custom?.event_id,
            ticket_price: img.context?.custom?.ticket_price,
            event_name: img.context?.custom?.event_name,
            group_name: img.context?.custom?.group_name,
            date: img.context?.custom?.date,
            time: img.context?.custom?.time,
            public_id: img.public_id,
            position: img.context?.custom?.position,
            url: img.optimized_url,
          })),
          gallery: hotelGallery.map((img) => ({
            public_id: img.public_id,
            url: img.optimized_url,
            position: img.context?.position,
          })),
          rooms: rooms,
          banquet: banquet,
        },
      });
    } else if (param === "food-court") {
      const FoodCourtHeroItems = await cloudService.listByMetadata(
        "position",
        "hero",
        param,
      );
      const FoodCourtPreference = await cloudService.listByMetadata(
        "position",
        "preference",
        param,
      );
      const foodCourtEvents = await cloudService.listImages("events", true);
      const foodCourtGallery = await cloudService.listImages("gallery", true);


      console.log(FoodCourtPreference)

      return c.json({
        data: {
          hero: FoodCourtHeroItems.map((img) => ({
            public_id: img.public_id,
            url: img.optimized_url,
            position: img.context?.position,
          })),
          events: foodCourtEvents.map((img) => ({
            pevent_id: img.context?.custom?.event_id,
            ticket_price: img.context?.custom?.ticket_price,
            event_name: img.context?.custom?.event_name,
            group_name: img.context?.custom?.group_name,
            date: img.context?.custom?.date,
            time: img.context?.custom?.time,
            public_id: img.public_id,
            position: img.context?.custom?.position,
            url: img.optimized_url,
          })),
          gallery: foodCourtGallery.map((img) => ({
            public_id: img.public_id,
            url: img.optimized_url,
            position: img.context?.position,
          })),
          preference: FoodCourtPreference.map((pre) => ({
            public_id: pre.public_id,
            url: pre.optimized_url,
            name: pre.context?.name,
          })),
        },
      });
    } else if (param.toLowerCase().includes("bakery")) {
      const bakeryImages = await cloudService.listImagesByTags(bakeryTypes);
      const bakeryHero = await cloudService.listByMetadata(
        "position",
        "hero",
        param,
      );
      const bakeryCategory = await cloudService.listByMetadata(
        "position",
        "category",
        param,
      );

      const hero: HotelHero[] = bakeryHero.map((itm) => ({
        public_id: itm.public_id,
        url: itm.optimized_url,
        position: itm.context.position,
      }));

      const category = bakeryCategory.map((cat) => ({
        public_id: cat.public_id,
        url: cat.optimized_url,
        position: cat.context?.position,
      }));

      const groupedItems: GroupedBakeryItems = {
        bread: [],
        biscuit: [],
        rusk: [],
        puff_and_snacks: [],
      };

      bakeryImages.forEach((img) => {
        const primaryTag = img.tags?.[0];
        if (!primaryTag || !bakeryTypes.includes(primaryTag)) {
          return;
        }
        const desc = img.context?.alt ?? "Description not available";

        groupedItems[primaryTag as keyof GroupedBakeryItems].push({
          title: img.context?.caption ?? "",
          public_id: img.public_id,
          desc,
          url: img.optimized_url,
        });
      });

      return c.json({
        data: { hero: hero, groupedItems, category },
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

export const uploadImage = async (
  imgFile: File,
  folder: string,
): Promise<UploadFileResult> => {
  try {
    const res = await cloudService.uploadMedia(imgFile, {
      maxSizeBytes: 3 * 1028 * 1024,
      folder: folder,
    });

    return res;
  } catch (err: any) {
    console.error(err);
    throw new Error("Image upload failed");
  }
};
