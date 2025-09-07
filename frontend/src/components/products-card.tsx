export default function ProductCard() {
  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      description: "Rich and creamy chocolate layered cake.",
      price: "₹450",
      image: "/room.jpg",
    },
    {
      id: 2,
      name: "Fresh Bread",
      description: "Soft and fluffy oven-fresh bread loaf.",
      price: "₹80",
      image: "/room.jpg",
    },
    {
      id: 3,
      name: "Blueberry Muffin",
      description: "Moist muffin filled with blueberries.",
      price: "₹120",
      image: "/room.jpg",
    },
    {
      id: 4,
      name: "Croissant",
      description: "Flaky and buttery French croissant.",
      price: "₹90",
      image: "/room.jpg",
    },
  ];

  return (
    <div className="w-full px-6 lg:px-20 mt-16 mb-12">


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-40">
              <div>
                <h3 className="text-xl font-bold text-[#002a3a] ">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semibold text-[#002a3a] ">
                  {product.price}
                </span>
                <button className=" text-white px-4 py-2 rounded-lg nexa bg-[#002a3a]  ">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
