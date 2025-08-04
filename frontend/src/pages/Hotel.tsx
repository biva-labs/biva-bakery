import GalleryMasonry from "../components/GalleryMasonry";
import HeroBanner from "../components/HeroBanner";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import RoomCardCarousel from "../components/RoomCardCarousal";

const rooms = [
  {
    imgurl: "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Standard",
    desc: `Essential comfort and amenities at the heart of the city.`,
    onAction: () => alert("Clicked Standard"),
  },
  {
    imgurl: "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Deluxe",
    desc: "Essential comfort and amenities at the heart of the city.",
    onAction: () => alert("Clicked Deluxe"),
  },
  {
    imgurl: "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg",
    title: "Suite",
    desc: "Essential comfort and amenities at the heart of the city.",
    onAction: () => alert("Clicked Suite"),
  },
  // ... more rooms
];

const gallery = [
    "https://i.pinimg.com/736x/99/23/13/992313d5c25945dd243056e7a6dda650.jpg",
    "https://i.pinimg.com/736x/45/08/6d/45086d314a1a7fc42b8b112d10d9e17d.jpg",
    "https://i.pinimg.com/736x/20/fb/76/20fb76ef07be4db3d004513f550f871a.jpg",
    "https://i.pinimg.com/736x/0a/13/f3/0a13f364abcde26105ce1a68a0c73def.jpg",
    "https://i.pinimg.com/736x/9a/c7/37/9ac737b49fa9a7b6d414154c21ec66f5.jpg",
    "https://i.pinimg.com/736x/66/30/c6/6630c6a18475e11eb9c431f89de4698c.jpg"
    
]

export default function Hotel() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <div className="ml-5 lg:ml-10">
        <div className="font-extrabold text-4xl mt-4 ">
          <h1>Our Rooms</h1>
        </div>
        <div>
          <p>Explore our range of elegant and comfortable rooms.</p>
        </div>
      </div>
      {/* <div className="mt-10 ml-5">
        <RoomCard
          imgurl={
            "https://i.pinimg.com/1200x/af/f2/69/aff26915501df944db3732592df0d06e.jpg"
          }
          title={"Standard"}
          desc={
            "The most basic and affordable accomodation option, offering essential comfort and amenities."
          }
        />
      </div> */}

      <RoomCardCarousel rooms={rooms} />
      <div className="px-4 py-8">
        <GalleryMasonry  allImages={gallery} batchSize={4} />
      </div>
    </>
  );
}
