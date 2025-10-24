

function NonVegetarianFood({media}:{media: any}) {
    return (
        <div className="w-full mt-16 mb-10 mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ">
                <video
                    className="w-full h-full object-cover"
                    src={media}
                    autoPlay
                    loop
                    muted
                    
                >
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



function VegetarianFood({media}:{media: any}) {
    return (
        <div className="w-full mt-16 mb-10 mx-auto">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden ">
                <video
                    className="w-full h-full object-cover"
                    src={media}
                    autoPlay
                    loop
                    muted
                >

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

function getOptimizedVideoUrl(url: string): string {
    try {
        // Parse the URL
        const parsedUrl = new URL(url);

        // Remove unnecessary query params (_a, etc.)
        parsedUrl.search = "";

        // Insert /f_auto,q_auto/ after /upload/
        const uploadIndex = parsedUrl.pathname.indexOf("/upload/");
        if (uploadIndex === -1) return url; // not a Cloudinary upload URL

        const beforeUpload = parsedUrl.pathname.slice(0, uploadIndex + 8); // include "/upload/"
        const afterUpload = parsedUrl.pathname.slice(uploadIndex + 8);

        parsedUrl.pathname = `${beforeUpload}f_auto,q_auto/${afterUpload}`;

        return parsedUrl.toString();
    } catch (e) {
        console.warn("Invalid URL passed to getOptimizedVideoUrl:", url);
        return url; // fallback
    }
}


export default function FoodCourtPreference({ preference, media }: { preference: string, media: any }) {
    console.log(getOptimizedVideoUrl(media))
    return (
        <>
            {
                
                preference === "veg" ? <VegetarianFood media={getOptimizedVideoUrl(media)}/> : <NonVegetarianFood media={getOptimizedVideoUrl(media)}/>
            }
        </>
    )
}