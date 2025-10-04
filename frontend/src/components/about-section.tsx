import { useLocation } from "react-router-dom";

export default function About() {

  const location = useLocation();

  const isBakeryPage = location.pathname.includes("/bakery");
  const color = isBakeryPage ? "[#DE4243]" : "[#002a3a]";

  return (
    <div className="mt-20 px-4 lg:px-10 mb-10">
      <div className="text-center">
        <h2 className={`text-3xl lg:text-4xl text-${color} outfit font-extrabold md:mt-6`}>
          Who Are We?
        </h2>

        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We are passionate bakers dedicated to bringing you the finest, freshest baked goods every day.
            With over two decades of experience in the art of baking, our family-owned bakery combines
            traditional recipes with modern techniques to create exceptional breads, pastries, and sweets.
            From our ovens to your table, we ensure every bite is crafted with love and the highest quality ingredients.
          </p>

          <a href="/about" className={`bg-${color} text-white px-8 py-3 rounded-lg font-semibold  transition-colors duration-200 shadow-lg`}>
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}