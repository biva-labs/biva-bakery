export default function Banquet({ media }: { media: any }) {
	return (
		<>
			{/* Banquet Hall Section */}
			<div className="w-full px-0 lg:px-0 mt-4 mb-10">
				<div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[80vh] xl:h-[75vh] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,223,0,0.6)]">
					<video
						src={media}
						className="w-full h-full object-cover"
						autoPlay
						loop
						muted
					>
						{/* <source src="/video.mp4" type="video/mp4" /> */}
					</video>

					<div className="absolute inset-0  bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent"></div>
					<div className="absolute bottom-4 left-4 md:left-10 text-left outfit">
						<h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold mb-2">
							BANQUET HALL
						</h2>

						<h3 className="text-white text-lg md:text-2xl font-bold]">
							Celebrate Your Special Moments With Us
						</h3>
					</div>
				</div>
			</div>

			{/* New Video Section */}
			<div className="w-full px-0 lg:px-0 mt-16 mb-10">
				<div className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[62vh] xl:h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,223,0,0.6)]">
					<video
						src="/bar.mp4"
						className="w-full h-full object-cover"
						autoPlay
						loop
						muted
					></video>

					<div className="absolute inset-0 bg-gradient-to-t from-yellow-900/40 via-transparent to-transparent"></div>

					{/* Top Left Text */}
					<div className="absolute top-4 left-4 md:top-10 md:left-10 text-left outfit">
						<h2 className="text-white text-xl md:text-4xl lg:text-6xl font-bold leading-tight">
							Expertly poured.
							<br />
							Effortlessly cool.
						</h2>
					</div>

					{/* Bottom Right Text */}
					<div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 text-right outfit">
						<h2 className="text-white text-xl md:text-4xl lg:text-6xl font-bold">
							Join the vibe.
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
