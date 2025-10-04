import WhatsappIcon from "@/icons/whatsapp";
import { useState } from "react";
import {PHONE} from "../../../../data/phone-data"

import type { CardImagesType } from "@/types/card-images-types";
import wa_link from "@/utils/wa-link";

export default function BakeryCard(props: CardImagesType) {

    const [isExpanded, setIsExpanded] = useState<Boolean>(false);

    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev)
    };

    return (
        <div className="h-full rounded-xl overflow-hidden bg-white shadow-md">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col h-full">
                <img
                    src={Array.isArray(props.url) ? props.url[0] : props.url}
                    alt={props.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-grow min-h-[160px]">
                    <div className="flex-grow">
                        <h3 className="text-xl font-bold text-[#002a3a] mb-2">
                            {props.title}
                        </h3>
                        <div className="text-gray-600 text-sm">
                            <p className={isExpanded ? "" : "line-clamp-1"}>
                                {props.desc}
                            </p>
                            {props.desc!.length > 50 && (
                                <button
                                    onClick={() => toggleExpanded()}
                                    className="text-blue-600 text-xs mt-1 hover:underline"
                                >
                                    {isExpanded ? "Show less" : "See details"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <a href={wa_link(`hey, I want to order ${props.title}`, PHONE["admin"])} className="text-white px-4 py-2 rounded-lg nexa bg-[#DE4243] flex items-center gap-2">
                            <WhatsappIcon />
                            Order Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}