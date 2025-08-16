import GalleryMasonry from "../components/mansory";
import RoomCardCarousel from "../components/room-card-carousal";
import HotelHero from "@/components/hotel-hero";

import Map from "@/components/map";

const rooms = [
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Deluxe",
    desc: "Essential comfort and amenities at the heart of the city.",
    onAction: () => alert("Clicked Deluxe"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Suite",
    desc: "Essential comfort and amenities at the heart of the city.",
    onAction: () => alert("Clicked Suite"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl:
      "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
];

const gallery = [
  "https://i.pinimg.com/736x/99/23/13/992313d5c25945dd243056e7a6dda650.jpg",
  "https://i.pinimg.com/736x/45/08/6d/45086d314a1a7fc42b8b112d10d9e17d.jpg",
  "https://i.pinimg.com/736x/20/fb/76/20fb76ef07be4db3d004513f550f871a.jpg",
  "https://i.pinimg.com/736x/0a/13/f3/0a13f364abcde26105ce1a68a0c73def.jpg",
  "https://i.pinimg.com/736x/9a/c7/37/9ac737b49fa9a7b6d414154c21ec66f5.jpg",
  "https://i.pinimg.com/736x/66/30/c6/6630c6a18475e11eb9c431f89de4698c.jpg",
];

export default function Hotel() {
  return (
    <div>
      <div className="mx-auto px-4 lg:mr-0 ">
        <HotelHero />
        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-2xl lg:text-4xl font-light text-center lg:text-start lg:ml-6 text-green-950 mb-2">
            Our Premium Rooms
          </h2>
          <p className="text-gray-600 text-center lg:text-start lg:ml-6 font-medium text-lg">
            Experience luxury and comfort in the heart of the city
          </p>
        </div>
        <RoomCardCarousel rooms={rooms} />

        <div className="mt-16">
          <h2 className="text-3xl lg:text-4xl  font-light lg:text-start lg:ml-6 text-center text-green-950 mb-8">
            Gallery
          </h2>
          <GalleryMasonry allImages={gallery} />
        </div>

        <div className="mt-10">
          <div className="flex flex-row lg:text-start text-center lg:ml-6 gap-2 md:mb-8 justify-center items-center lg:justify-start ">
            <h2 className="text-3xl lg:text-4xl text-green-950 font-light  md:mt-6">
              Near Biva?
            </h2>
            <img
              src="/map.png"
              alt="Location indicator"
              className="md:h-20 md:w-20 h-8 w-8"
            />
          </div>
          <Map />
        </div>
      </div>
    </div>
  );
}
