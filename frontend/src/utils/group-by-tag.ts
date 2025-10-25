import { type CardImagesType } from "@/types/card-images-types";

export function groupByTag(rooms: CardImagesType[]): Record<string, CardImagesType> {
  const grouped: Record<string, CardImagesType> = {};

  rooms.forEach(room => {
    if (!room.room_type) return;

    if (!grouped[room.room_type]) {
      grouped[room.room_type] = {
        ...room,
        url: Array.isArray(room.url) ? [...room.url] : room.url ? [room.url] : [],
      };
    } else {

      const existingUrls = Array.isArray(grouped[room.room_type].url) ? grouped[room.room_type].url : [grouped[room.room_type].url];
      const newUrls = Array.isArray(room.url) ? room.url : room.url ? [room.url] : [];

      grouped[room.room_type].url = Array.from(new Set([...existingUrls, ...newUrls].flat()));
    }
  });

  return grouped;
}
