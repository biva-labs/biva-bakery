import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function About() {
  return (
    <div className="mt-20 px-4 lg:px-10 mb-10">
      <h2 className="text-3xl lg:text-4xl text-green-950 outfit font-extrabold md:mt-6">
        About Us
      </h2>

      <div className="grid grid-cols-1 outfit md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {[
          {
            name: 'John Doe',
            image: 'https://i.pinimg.com/736x/22/5f/4c/225f4c968155fcd81cc89182f673583b.jpg',
          },
          {
            name: 'Jane Smith',
            image: 'https://i.pinimg.com/736x/88/ae/fb/88aefb54ee3f3e7191b3df89b5230ad0.jpg',
          },
          {
            name: 'Michael Lee',
            image: 'https://i.pinimg.com/736x/22/5f/4c/225f4c968155fcd81cc89182f673583b.jpg',
          },
          {
            name: 'Sarah Khan',
            image: 'https://i.pinimg.com/736x/fc/e7/ee/fce7ee0370417f8d30c3b77fbc704ffd.jpg',
          },
        ].map(({ name, image }) => (
          <div
            key={name}
            className="relative group bg-white rounded-2xl p-6 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Profile Image with Fade Overlay */}
            <div className="relative w-full h-full">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Mobile-only overlay and text */}
              <div className="absolute inset-0 md:hidden flex flex-col items-center justify-center text-white text-xl font-bold">
                <div className="absolute inset-0 bg-black opacity-60 rounded-lg" />
                <h3 className="relative z-10">{name}</h3>
                <div className="relative z-10 flex space-x-4 mt-2">
                  <a href="#" className="text-xl hover:text-blue-600">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-xl hover:text-pink-600">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-xl hover:text-green-600">
                    <FaWhatsapp />
                  </a>
                  <a href="#" className="text-xl hover:text-red-600">
                    <FaEnvelope />
                  </a>
                </div>
              </div>

              {/* Desktop-only overlay, name, and icons */}
              <div className="hidden md:block absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg" />
              <h3 className="hidden md:flex absolute inset-0 items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {name}
              </h3>
              <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex space-x-4 text-white">
                  <a href="#" className="text-xl hover:text-blue-600">
                    <FaFacebook />
                  </a>
                  <a href="#" className="text-xl hover:text-pink-600">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-xl hover:text-green-600">
                    <FaWhatsapp />
                  </a>
                  <a href="#" className="text-xl hover:text-red-600">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}