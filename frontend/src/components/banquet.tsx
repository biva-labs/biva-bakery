export default function Banquet() {
  return (
    <div className="w-full px-0 lg:px-0 mt-16 mb-10">
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,223,0,0.6)]">
        <video
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent"></div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-white text-lg md:text-2xl font-semibold drop-shadow-[0_0_10px_rgba(255,223,0,0.9)]">
            Celebrate Your Special Moments With Us
          </h3>
        </div>
      </div>
    </div>
  );
}
