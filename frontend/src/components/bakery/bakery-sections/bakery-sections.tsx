import BakeryCardCarousal from "./bakery-card-carousal";

import { type CardImagesType } from "@/types/card-images-types"

type BakerySectionsType = {
    title: string;
    products: CardImagesType[]
}

function capitalizeFirstLetter(val: string): string {
  if (!val) return "";
  const formatted = val.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}



export default function BakerySections(props: BakerySectionsType) {
    return (
        <div className="mb-8 text-center lg:text-left mt-10">
            <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-[#DE4243] ">
                {capitalizeFirstLetter(props.title)}
            </h2>
            <BakeryCardCarousal products={props.products} />
        </div>
    )
}