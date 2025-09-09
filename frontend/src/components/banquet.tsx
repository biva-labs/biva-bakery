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
        </video>

        <div className="absolute inset-0  bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent"></div>

        {/* This is the new container for both headings.
            We've changed its positioning to be left-aligned.
        */}
        <div className="absolute bottom-4 left-4 md:left-10 text-left outfit">
          {/* Large "BANQUET HALL" heading */}
          <h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold drop-shadow-[0_0_10px_rgba(255,223,0,0.9)] mb-2">
            BANQUET HALL
          </h2>
          
          {/* Your original "Celebrate..." heading, now left-aligned and bold */}
          <h3 className="text-white text-lg md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(255,223,0,0.9)]">
            Celebrate Your Special Moments With Us
          </h3>
        </div>
      </div>
    </div>
  );
}