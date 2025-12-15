
export default function About() {

    const aboutUsImages = [
        "/about-us-first.jpeg",
        "/about-us-second.jpeg",
        "/about-us-third.jpeg",
        "/about-us-fourth.jpeg",
        "/about-us-fifth.jpeg",
        "/about-us-sixth.jpeg",
        "/about-us-seventh.jpeg",
        "/about-us-eigth.jpeg",
    ];

    return (
        <div className="min-h-screen py-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <p className="text-[#a67c52] text-lg tracking-widest uppercase mb-4 font-medium">
                        Est. in Silchar, Assam
                    </p>
                    <h1 className="text-5xl lg:text-6xl outfit font-extrabold text-[#5c3d2e] mb-6 tracking-wide">
                        Our Story
                    </h1>
                    <div className="w-24 h-1 bg-[#a67c52] mx-auto mb-8"></div>
                    <p className="text-xl text-[#5c3d2e]/80 italic max-w-2xl mx-auto">
                        "Where every bite tells a story, and every visit feels like home."
                    </p>
                </div>

                {/* Our Beginning Section */}
                <div className="mb-16">
                    <h2 className="text-2xl outfit font-bold text-[#5c3d2e] mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-[#a67c52]"></span>
                        The Beginning
                    </h2>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-6">
                        <strong>Biva Bakery</strong> was born from a simple yet profound vision — to bring the <em>warmth of home-baked goodness</em> to
                        the heart of <strong>Silchar, Assam</strong>. What started as a humble bakery has blossomed into a beloved destination
                        for locals and visitors alike, spanning <em>multiple branches across the city</em>. Our journey has been shaped by an
                        unwavering commitment to quality, authenticity, and the joy of creating moments worth savoring.
                    </p>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify">
                        Every loaf of bread we bake, every pastry we craft, and every sweet we prepare carries with it the dedication of our
                        skilled artisans who pour their heart into perfecting time-honored recipes. From <em>freshly baked breads</em> and
                        <em> flaky pastries</em> to <em>decadent cakes</em> and <em>traditional sweets</em> — our collection is curated to
                        delight every palate and celebrate every occasion.
                    </p>
                </div>

                {/* More Than a Bakery Section */}
                <div className="mb-16">
                    <h2 className="text-2xl outfit font-bold text-[#5c3d2e] mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-[#a67c52]"></span>
                        More Than a Bakery
                    </h2>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-6">
                        Over the years, Biva has grown beyond its roots into a <strong>complete hospitality experience</strong>. Our
                        <em> Food Court</em> offers a vibrant space where families and friends gather for memorable brunches and dinners,
                        enjoying a diverse menu that celebrates both local flavors and contemporary cuisines. It's a place where conversations
                        flow as freely as the aroma of freshly prepared meals.
                    </p>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify">
                        For travelers seeking comfort and elegance, <strong>Biva Hotel</strong> extends a warm welcome. Designed with
                        thoughtful attention to detail, our accommodations provide a serene retreat for tourists and visitors exploring
                        the beauty of Assam. Whether you're here for business or leisure, we ensure your stay is nothing short of exceptional.
                    </p>
                </div>

                {/* Image Gallery Scroll */}
                <div className="mb-16 overflow-hidden rounded-xl">
                    <div className="flex space-x-6" style={{
                        animation: 'scrollLeft 60s linear infinite',
                        width: 'calc(320px * 16)'
                    }}>
                        {[...aboutUsImages, ...aboutUsImages].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-80 h-70 bg-[#a67c52] rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                                <img
                                    src={src}
                                    alt={`Biva Bakery ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Events & Community Section */}
                <div className="mb-16">
                    <h2 className="text-2xl outfit font-bold text-[#5c3d2e] mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-[#a67c52]"></span>
                        Celebrating Together
                    </h2>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify mb-6">
                        At Biva, we believe in bringing people together. Throughout the week, we host a variety of <strong>events</strong> —
                        from intimate gatherings to grand celebrations — that bring the community closer. Our spaces are designed to create
                        memories, whether you're celebrating a <em>milestone birthday</em>, a <em>corporate gathering</em>, or simply an
                        evening with loved ones.
                    </p>
                    <p className="text-lg text-[#5c3d2e] leading-relaxed text-justify">
                        Being rooted in <strong>Silchar</strong>, we take immense pride in serving our community. Every smile we see, every
                        satisfied customer who walks through our doors, reaffirms our purpose. <em>We don't just serve food — we serve
                            happiness, one plate at a time.</em>
                    </p>
                </div>

                {/* Our Promise Section */}
                <div className="mb-16 bg-[#fefce8]/50 p-8 rounded-xl border border-[#a67c52]/20">
                    <h2 className="text-2xl outfit font-bold text-[#5c3d2e] mb-6 text-center">
                        Our Promise
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-3xl mb-3">🥐</p>
                            <h3 className="font-bold text-[#5c3d2e] mb-2">Quality First</h3>
                            <p className="text-[#5c3d2e]/80 text-sm">
                                Premium ingredients, traditional recipes, and uncompromising standards.
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl mb-3">🏠</p>
                            <h3 className="font-bold text-[#5c3d2e] mb-2">Warm Hospitality</h3>
                            <p className="text-[#5c3d2e]/80 text-sm">
                                Every guest is family, and every visit should feel like coming home.
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl mb-3">💛</p>
                            <h3 className="font-bold text-[#5c3d2e] mb-2">Community Love</h3>
                            <p className="text-[#5c3d2e]/80 text-sm">
                                Proudly serving Silchar with love, gratitude, and dedication.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Closing Note */}
                <div className="text-center bg-[#5c3d2e] text-[#fefce8] py-12 px-8 rounded-xl shadow-xl">
                    <p className="text-xl leading-relaxed mb-6 max-w-3xl mx-auto">
                        <em>
                            Thank you for taking the time to learn about our story. At Biva Bakery, we believe that
                            <strong> every bite should be a moment of pure joy</strong>, and every visit should feel like coming home.
                            We are deeply grateful for your continued support and look forward to serving you with the finest baked goods,
                            exceptional hospitality, and unforgettable experiences.
                        </em>
                    </p>
                    <div className="w-16 h-1 bg-[#a67c52] mx-auto mb-6"></div>
                    <p className="text-lg italic opacity-90">
                        With warmest regards,
                    </p>
                    <p className="text-xl font-bold mt-2">
                        The Biva Bakery Family
                    </p>
                    <p className="text-sm mt-4 opacity-70 tracking-wider">
                        Silchar, Assam • India
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