import { type CardImagesType } from "@/types/card-images-types";

type GroupedPhotosType = {
  tag: string;
  photos: CardImagesType[];
};

export const ROOM_PHOTOS_DATA: GroupedPhotosType[] = [];