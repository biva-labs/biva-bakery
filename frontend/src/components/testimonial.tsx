import { useLocation } from "react-router-dom";

export default function Testimonial() {

    const location = useLocation();
      const isBakeryPage = location.pathname.includes("/bakery");
    const textColor = isBakeryPage ? "text-[#DE4243]" : "text-[#002a3a]";

    const testimonials = [
        {
            id: 1,
            name: "Priya Sharma",
            image: "/bakery-hero.jpg",
            feedback: "The freshest bread I've ever tasted! Their morning deliveries have become a daily ritual for our family.",
            rating: 5,
            location: "Mumbai"
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            image: "/bakery-hero.jpg",
            feedback: "Outstanding pastries and excellent service. The birthday cake for my daughter was absolutely perfect!",
            rating: 5,
            location: "Delhi"
        },
        {
            id: 3,
            name: "Anita Patel",
            image: "/bakery-hero.jpg",
            feedback: "Love their egg-less options! As a vegetarian, it's wonderful to have such delicious choices.",
            rating: 4,
            location: "Ahmedabad"
        },
        {
            id: 4,
            name: "Vikram Singh",
            image: "/bakery-hero.jpg",
            feedback: "Best cookies in town! The texture and flavors are incredible. Highly recommend their sweets section.",
            rating: 5,
            location: "Jaipur"
        },
        {
            id: 5,
            name: "Meera Reddy",
            image: "/bakery-hero.jpg",
            feedback: "Fresh baked goods every morning. The quality is consistently amazing and staff is very friendly.",
            rating: 5,
            location: "Hyderabad"
        },
        {
            id: 6,
            name: "Arjun Nair",
            image: "/bakery-hero.jpg",
            feedback: "Their bento cakes are adorable and taste even better than they look! Perfect for small celebrations.",
            rating: 4,
            location: "Kochi"
        }
    ];

    // Split testimonials into two rows
    const firstRow = testimonials.slice(0, 3);
    const secondRow = testimonials.slice(3, 6);

    // Duplicate items for infinite scroll
    const duplicatedFirstRow = [...firstRow, ...firstRow, ...firstRow, ...firstRow, ...firstRow];
    const duplicatedSecondRow = [...secondRow, ...secondRow, ...secondRow, ...secondRow, ...secondRow];

    // Render stars function
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                viewBox="0 0 24 24"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ));
    };

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
                        animation: scroll-left-testimonial 80s linear infinite;
                    }
                    
                    .scroll-right-testimonial {
                        animation: scroll-right-testimonial 80s linear infinite;
                    }
                `
            }} />

            {/* First Row - Scrolling Left */}
            <div className="relative mb-8">
                {/* Light black foggy gradient overlays */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                
                <div className="flex space-x-6 scroll-left-testimonial">
                    {duplicatedFirstRow.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="flex-shrink-0 w-96 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                                        <div className="flex items-center space-x-1">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>
                                    <p className="text-gray-700 text-sm leading-relaxed italic">
                                        "{testimonial.feedback}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Row - Scrolling Right */}
            <div className="relative">
                {/* Light black foggy gradient overlays */}
                <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50/70 to-transparent z-10"></div>
                
                <div className="flex space-x-6 scroll-right-testimonial">
                    {duplicatedSecondRow.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="flex-shrink-0 w-96 bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                        >
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                                        <div className="flex items-center space-x-1">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-3">{testimonial.location}</p>
                                    <p className="text-gray-700 text-sm leading-relaxed italic">
                                        "{testimonial.feedback}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}