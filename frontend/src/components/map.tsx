import { locations } from "../../data/map"

export default function Map() {
  return (
    <div className="mt-10 px-4 lg:px-10 mb-10">
      <h2 className="text-3xl lg:text-4xl text-green-950 outfit font-extrabold md:mt-20">
        Near Biva?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {locations.map((loc, index) => (
          <div key={index} className="w-full group">
            <div className="relative p-1 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-3xl shadow-lg overflow-hidden">
              <iframe
                src={loc.mapSrc}
                style={{ border: 0 }}
                className="w-full h-80 rounded-3xl"
                loading="lazy"
              />
            </div>

            <h2 className="mt-4 text-2xl lg:text-3xl text-center text-green-950 outfit font-light relative">
              {loc.title}
              <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 transition-all duration-300 ease-out bg-gradient-to-r from-blue-300 to-blue-500 group-hover:w-full group-hover:left-0" />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
