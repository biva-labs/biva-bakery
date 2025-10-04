

function NonVegetarianFood() {
    return (
        <div className="w-full mt-16 mb-10 mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ">
                <video
                    className="w-full h-full object-cover"
                
                    autoPlay
                    loop
                    muted
                >
                    <source src="/biva-non-veg.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0"></div>

                <div className="absolute bottom-4 left-4 md:left-10 text-left outfit">
                    <h2 className="text-white outfit text-2xl md:text-4xl lg:text-5xl font-bold ] mb-2">
                        NON-VEGETARIAN
                    </h2>
                    <h3 className="text-white text-base md:text-xl font-bold]">
                        Indulge in Rich & Savory Delights
                    </h3>
                </div>
            </div>
        </div>
    );
}

function VegetarianFood() {
    return (
        <div className="w-full mt-16 mb-10 mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ">
                <video
                    className="w-full h-full object-cover"
              
                    autoPlay
                    loop
                    muted
                >
                    <source src="/biva-veg.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 "></div>

                <div className="absolute bottom-4 left-4 md:left-10 text-left outfit">
                    <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold ] mb-2">
                        PURE VEGETARIAN
                    </h2>
                    <h3 className="text-white text-base md:text-xl font-bold]">
                        Savor the Flavors of Nature's Bounty
                    </h3>
                </div>
            </div>
        </div>
    );
}


export default function FoodCourtPreference({ preference }: { preference: string }) {
    return (
        <>
            {
                preference === "veg" ? <VegetarianFood /> : <NonVegetarianFood />
            }
        </>
    )
}