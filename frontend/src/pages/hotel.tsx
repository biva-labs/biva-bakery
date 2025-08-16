import GalleryMasonry from "../components/mansory";
import RoomCardCarousel from "../components/room-card-carousal";
import Hero from "@/components/hero";

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
        <Hero
          title={
            <>
              Experience <br /> Luxury
            </>
          }
          description={
            <>
              Experience luxury and
              <br /> comfort in the heart of the city
            </>
          }
          buttonText={<>Contact Us</>}
          buttonDescription={<>Available at just ₹4999/-</>}
        />
        <div className="mb-8 text-center lg:text-left mt-10">
          <h2 className="text-4xl lg:text-4xl outfit font-extrabold ml-4 text-start lg:ml-6 text-green-950 mb-2">
            Our Premium Rooms
          </h2>
          <p className="text-gray-600 ml-4 text-start lg:ml-6  font-medium text-lg">
            Experience luxury and comfort in the heart of the city
          </p>
        </div>
        <RoomCardCarousel rooms={rooms} />

        <div className="mt-16">
          <h2 className="text-4xl ml-4 lg:text-4xl text-start lg:ml-6 outfit font-extrabold text-green-950 ">
            Gallery
          </h2>
          <GalleryMasonry allImages={gallery} />
        </div>
      </div>
    </div>
  );
}
