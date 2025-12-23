import { useLocation } from "react-router-dom";
import { testimonials } from "../../../data/testimonials"
import TestimonialCard from "./testimonial-card";

export default function Testimonial() {

    const location = useLocation();
    const isBakeryPage = location.pathname.includes("/bakery");
    const textColor = isBakeryPage ? "text-[#DE4243]" : "text-[#002a3a]";

    const half = Math.ceil(testimonials.length / 2);
    const firstRow = testimonials.slice(0, half);
    const secondRow = testimonials.slice(half);

    const duplicatedFirstRow = [...firstRow, ...firstRow, ...firstRow, ...firstRow, ...firstRow];
    const duplicatedSecondRow = [...secondRow, ...secondRow, ...secondRow, ...secondRow, ...secondRow];

    return (
        <div className="w-full py-16 bg-gray-50 overflow-hidden">
            <div className="text-center mb-12">
                <h2 className={`text-4xl font-extrabold ${textColor} mb-4`}>What Our Customers Say</h2>
                <p className="text-gray-600 text-lg">Real experiences from our valued customers</p>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes scroll-left-testimonial {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-60%); }
                    }
                    
                    @keyframes scroll-right-testimonial {
                        0% { transform: translateX(-60%); }
                        100% { transform: translateX(0%); }
                    }
                    
                    .scroll-left-testimonial {
                        animation: scroll-left-testimonial 10s linear infinite;
                    }
                    
                    .scroll-right-testimonial {
                        animation: scroll-right-testimonial 10s linear infinite;
                    }
                `
            }} />

            <div className="relative mb-8">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50/70 to-transparent z-10"></div>

                <div
                    className="flex space-x-6 scroll-left-testimonial"
                    onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        target.getAnimations().forEach(anim => anim.updatePlaybackRate(0.1));
                    }}
                    onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.getAnimations().forEach(anim => anim.updatePlaybackRate(1));
                    }}
                >
                    {duplicatedFirstRow.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} {...testimonial} />
                    ))}
                </div>
            </div>

            <div className="relative">
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50/70 to-transparent z-10"></div>

                <div
                    className="flex space-x-6 scroll-right-testimonial"
                    onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        target.getAnimations().forEach(anim => anim.updatePlaybackRate(0.1));
                    }}
                    onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.getAnimations().forEach(anim => anim.updatePlaybackRate(1));
                    }}
                >
                    {duplicatedSecondRow.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} {...testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
}