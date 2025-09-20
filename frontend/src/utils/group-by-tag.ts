import { type Room } from "@/components/room-card-carousal";

export interface RoomType {
  desc?: string;
  price?: string;
  images: string[];
}

// Clean structure: roomType -> { desc, price, images }
export function groupByTag(rooms: Room[]): Record<string, RoomType> {
  const grouped: Record<string, RoomType> = {};
  
  rooms.forEach(room => {
    if (!room.tag) return;
    
    if (!grouped[room.tag]) {
      // Create new room type
      grouped[room.tag] = {
        desc: room.desc,
        price: room.price,
        images: room.url ? [room.url] : []
      };
    } else {
      // Add image to existing room type (avoid duplicates)
      if (room.url && !grouped[room.tag].images.includes(room.url)) {
        grouped[room.tag].images.push(room.url);
      }
    }
  });
  
  return grouped;
}
