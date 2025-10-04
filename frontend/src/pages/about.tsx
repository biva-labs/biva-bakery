
export default function About() {
    return (
        <div className=" min-h-screen py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl lg:text-6xl outfit font-extrabold text-[#5c3d2e] mb-6 tracking-wide">
                        About Biva Bakery
                    </h1>
                    <div className="w-24 h-1 bg-[#a67c52] mx-auto mb-8"></div>
                </div>

                {/* First Paragraph */}
                <div className="mb-12">
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
                        voluptatem accusantium doloremque laudantium.
                    </p>
                </div>

     

                {/* Second Paragraph */}
                <div className="mb-12">
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-8">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia 
                        deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam 
                        libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, 
                        omnis voluptas assumenda est.
                    </p>
                </div>



                {/* Third Paragraph */}
                <div className="mb-12">
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-8">
                        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae 
                        sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus 
                        maiores alias consequatur aut perferendis doloribus asperiores repellat. Nam libero tempore, cum soluta nobis est eligendi 
                        optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor 
                        repellendus aliquam quaerat voluptatem.
                    </p>
                </div>

                {/* Third Image Scroll */}
                <div className="mb-12 overflow-hidden">
                    <div className="flex space-x-6" style={{
                        animation: 'scrollLeft 60s linear infinite',
                        width: 'calc(320px * 12)'
                    }}>
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-80 h-48 bg-[#a67c52] rounded-lg shadow-lg overflow-hidden">
                                <img 
                                    src="/amenities.jpeg" 
                                    alt={`Amenities ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fourth Paragraph */}
                <div className="mb-16">
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-8">
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius 
                        modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure 
                        reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo 
                        voluptas nulla pariatur. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                    </p>
                </div>

                {/* Closing Note */}
                <div className="text-center bg-[#5c3d2e] text-[#fefce8] py-12 px-8 rounded-lg shadow-xl">
                    <p className="text-xl leading-relaxed mb-6">
                        <strong><em>
                            Thank you for taking the time to learn about our story. At Biva Bakery, we believe that every bite should be a 
                            moment of pure joy, and every visit should feel like coming home. We are grateful for your continued support and 
                            look forward to serving you with the finest baked goods, exceptional hospitality, and unforgettable experiences.
                        </em></strong>
                    </p>
                    <div className="w-16 h-1 bg-[#a67c52] mx-auto mb-4"></div>
                    <p className="text-lg">
                        <strong><em>With warmest regards, The Biva Bakery Family</em></strong>
                        <img src="../../public/hotel_biva.png" alt="" className="w-20 flex ml-auto mr-8 h-auto"/>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes scrollRight {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    )
}