import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function About() {

  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const isBakeryPage = location.pathname.includes("/bakery");
  const color = isBakeryPage ? "[#DE4243]" : "[#002a3a]";

  const floatingEmojis = [
    { emoji: "🍰", x: -100, y: -40, r: -15, d: 0 },
    { emoji: "🧁", x: 100, y: -40, r: 15, d: 0.05 },
    { emoji: "🥐", x: -120, y: 20, r: -20, d: 0.1 },
    { emoji: "🥨", x: 120, y: 20, r: 20, d: 0.15 },
    { emoji: "🥯", x: -70, y: 60, r: -30, d: 0.1 },
    { emoji: "🍪", x: 70, y: 60, r: 30, d: 0.05 },
    { emoji: "🥖", x: 0, y: -70, r: 90, d: 0.1 },
  ];

  return (
    <div className="mt-20 px-4 lg:px-10 mb-10">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes rainbow-move {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .rainbow-text {
            background: linear-gradient(to bottom right, red, orange, yellow, green, blue, indigo, violet, red);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: rainbow-move 1s linear infinite;
          }
        `
      }} />
      <div className="text-center">
        <div
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className={`text-3xl lg:text-4xl text-${color} outfit font-extrabold md:mt-6 relative z-10 bg-white/50 backdrop-blur-[1px] rounded-lg px-2`}>
            Who Are <span className="rainbow-text">We</span>?
          </h2>
          {floatingEmojis.map((item, index) => (
            <span
              key={index}
              className="absolute top-1/2 left-1/2 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                transform: isHovered
                  ? `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px)) rotate(${item.r}deg) scale(1)`
                  : `translate(-50%, -50%) rotate(0deg) scale(0)`,
                opacity: isHovered ? 1 : 0,
                fontSize: "1.5rem",
                zIndex: 0,
                transitionDelay: `${item.d}s`
              }}
            >
              {item.emoji}
            </span>
          ))}
        </div>

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