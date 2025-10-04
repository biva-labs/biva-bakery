import { RenderStars } from "@/utils/rating-star"

type TestimonialCardType = {
    id: string | number;
    name: string;
    image: string;
    feedback: string;
    rating: number;
    location: string;
}

export default function TestimonialCard(props: TestimonialCardType) {
    return (
        <div
            className="flex-shrink-0 w-96 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
            <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={props.image}
                        alt={props.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">{props.name}</h3>
                        <div className="flex items-center space-x-1">
                            {RenderStars(props.rating)}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{props.location}</p>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                        "{props.feedback}"
                    </p>
                </div>
            </div>
        </div>
    )
}