import Hero from "@/components/hero";
import { useImages } from "@/hooks/useImages";
import { useState } from "react";
import { useEffect } from "react";
import BakerySections from "@/components/bakery/bakery-sections/bakery-sections";
import GalleryMasonry from "@/components/gallery/masonary";

import { type CardImagesType } from "@/types/card-images-types";
// import { type CardImagesType } from "@/types/card-images-types";
import { type HeroImagesType } from "@/types/hero-images-types";
import { type GalleryImagesType } from "@/types/gallery-images-types";

import ProductCategoryRow from "@/components/bakery/bakery-category/product-category-row";

type GroupedBakeryData = {
    [key: string]: CardImagesType[];
};

export default function Bakery() {
    // const [groupedBakeryData, setGroupedBakeryData] = useState<GroupedBakeryData>({});
    const [bakeryHero, setBakeryHero] = useState<HeroImagesType[]>([]);
    // const [bakeryCategory, setBakeryCategory] = useState<HeroImagesType[]>([]);
    const [bakeryItems, setBakeryItems] = useState<GroupedBakeryData>({});
    const [bakeryGallery, setBakeryGallery] = useState<GalleryImagesType[]>([]);

    const { data, error, isLoading } = useImages("bakery");

    useEffect(() => {
        if (data) {
            console.log(data.data);
            setBakeryHero(data.data.hero);
            setBakeryItems(data.data.groupedItems);
            setBakeryGallery(data.data.gallery);
        }
    }, [data]);

    if (error) {
        return (
            <div className="text-center py-10">Error loading bakery data</div>
        );
    }

    if (isLoading) {
        // do soemthing
    }

    return (
        <div className="outfit">
            <div className="mx-auto px-4 lg:mr-0">
                <Hero
                    title={
                        <div className="text-center ">
                            Fresh from the oven, <br /> straight to your hearts
                        </div>
                    }
                    images={bakeryHero}
                />

                <div className="mb-8 text-center lg:text-left mt-10">
                    <h2 className="text-4xl lg:text-4xl outfit text-center font-extrabold text-[#DE4243] mb-2">
                        Whats on your mind?
                    </h2>
                    <ProductCategoryRow />
                </div>

                <div className="outfit w-screen bg-[#DE4243] py-2 text-center text-white -ml-[calc((100vw-100%)/2)] -mr-[calc((100vw-100%)/2)]">
                    Order bulk for your house party
                </div>

                {Object.entries(bakeryItems).map(([category, items]) => (
                    <BakerySections title={category} products={items} />
                ))}

                                <div className="mt-16 mb-10 flex flex-col items-left  px-4">
                    <h2 className="text-3xl lg:text-4xl font-black text-green-950 tracking-tight">
                        Sweets
                    </h2>
                    <div className="mt-10 relative">
                        <span className="relative z-10 px-6 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm lg:text-base font-bold uppercase tracking-widest border border-amber-200 shadow-sm">
                            All sweets available
                        </span>
                    </div>
                </div>

                <div className="mt-16" id="gallery">
                    <h2 className="text-3xl lg:text-4xl text-start lg:ml-6 ml-4 outfit font-extrabold text-green-950 mb-2">
                        Gallery
                    </h2>
                    <GalleryMasonry allImages={bakeryGallery} />
                </div>
            </div>
        </div>
    );
}
