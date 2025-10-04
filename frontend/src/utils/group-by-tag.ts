import { type CardImagesType } from "@/types/card-images-types";

export function groupByTag(rooms: CardImagesType[]): Record<string, CardImagesType> {
  const grouped: Record<string, CardImagesType> = {};

  rooms.forEach(room => {
    if (!room.tag) return;

    if (!grouped[room.tag]) {
      grouped[room.tag] = {
        ...room,
        url: Array.isArray(room.url) ? [...room.url] : room.url ? [room.url] : [],
      };
    } else {

      const existingUrls = Array.isArray(grouped[room.tag].url) ? grouped[room.tag].url : [grouped[room.tag].url];
      const newUrls = Array.isArray(room.url) ? room.url : room.url ? [room.url] : [];

      grouped[room.tag].url = Array.from(new Set([...existingUrls, ...newUrls].flat()));
    }
  });

  return grouped;
}
