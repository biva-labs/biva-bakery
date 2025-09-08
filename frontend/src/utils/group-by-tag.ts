import { type Room } from "@/components/room-card-carousal";

// Groups rooms into { [tag]: [urls...] }
export function groupByTag(rooms: Room[]) {
  return rooms.reduce((acc, room) => {
    if (!room.tag) return acc;
    if (!acc[room.tag]) acc[room.tag] = [];
    if (room.url) acc[room.tag].push(room.url);
    return acc;
  }, {} as Record<string, string[]>);
}
