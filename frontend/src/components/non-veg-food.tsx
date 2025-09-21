// components/ui/non-veg-food.jsx
import React from 'react';

export default function NonVegetarianFood() {
  return (
    <div className="w-full mt-16 mb-10 mx-auto">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(220,53,69,0.6)]">
        <video
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
        >
          <source src="/non_veg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent"></div>

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