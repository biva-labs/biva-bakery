import { useState, useMemo, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Form from "./form";
import Amenities from "../amenities";
import { useHotelForm } from "@/hooks/useHotelForm";
import usePay from "@/hooks/usePay";
import { toast } from "sonner";
import { useHotelStore } from "@/store/hotel-store";
import { useRoomStore } from "@/store/hotel-card-store";
import { useLocation } from "react-router-dom";
import RoomImageViewer from "./room-image-viewer";

export const RoomBookingPage = memo(function RoomBookingPage() {
	const location = useLocation();
	const pathname = location.pathname.toLowerCase();
	const roomType = pathname.replace("/booking/", "").trim();

	const cardData = useRoomStore((s) => s.rooms[roomType]);

	// UI states — hooks must be called unconditionally before any early return
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const data = useHotelStore();

	const { mutate: submitForm, isPending } = useHotelForm();
	const { initiatePayment, isProcessing } = usePay();

	const url = cardData?.url;
	const price = cardData?.price ?? "0";
	const room_type = cardData?.room_type ?? "";
	const onSale = cardData?.onSale ?? false;
	const saleValue = cardData?.saleValue ?? null;

	const effectivePrice = onSale && saleValue != null ? saleValue : parseInt(price);

	const images = useMemo(
		() => (Array.isArray(url) ? url : url ? [url] : []),
		[url],
	);
	const selectedImage = images[selectedImageIndex] ?? "";

	const buttonText = useMemo(() => {
		if (isPending || isProcessing) return "Processing...";

		const guests = parseInt(data.total_people);
		const priceInt = effectivePrice;
		const rooms = parseInt(data.total_rooms);
		const days = parseInt(data.total_days);

		if ([guests, priceInt, rooms, days].some(isNaN)) {
			return "Pay Now";
		}

		return `Pay Now ₹${rooms * priceInt * days}`;
	}, [
		isPending,
		isProcessing,
		data.total_people,
		data.total_rooms,
		data.total_days,
		effectivePrice,
	]);

	const handleBookAndPay = useCallback(() => {
		if (
			!data.name ||
			!data.email ||
			!data.phone_number ||
			!data.join_date ||
			!data.leave_date ||
			!data.total_people
		) {
			toast.error("Please fill all required fields");
			return;
		}

		if (!data.adhaar_or_pan_card) {
			toast.error("Please upload your Aadhar / Voter ID / Driving License");
			return;
		}

		submitForm(
			{
				name: data.name,
				email: data.email,
				phone_number: data.phone_number,
				adhaar_or_pan_card: data.adhaar_or_pan_card,
				secondary_doc_card: data.secondary_doc_card,
				total_people: data.total_people,
				join_date: data.join_date,
				leave_date: data.leave_date,
				type: room_type,
				total_days: data.total_days,
				total_rooms: data.total_rooms,
			},
			{
				onSuccess: async (response) => {
					// console.log("room booking page", response);
					const amount = response.data?.total_amount;
					const id = response.data?.id;

					if (amount && id) {
						await initiatePayment(amount, [id], "hotel");
					} else {
						toast.error("Invalid server response");
					}
				},
				onError: (error: Error) => {
					const msg = error.message ?? "Booking failed";
					toast.error(msg);
				},
			},
		);
	}, [data, room_type, submitForm, initiatePayment]);

	if (!cardData) {
		return (
			<p className="text-red-500 text-center mt-10">Invalid Room Type</p>
		);
	}

	return (
		<div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto px-4">
			{/* LEFT SIDE — GALLERY */}
			<div className="lg:w-[56%] space-y-6 mt-6">
				{/* MAIN IMAGE CARD */}
				<div
					className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
					onClick={() => setGalleryOpen(true)}
				>
					<img
						src={selectedImage}
						className="w-full h-[420px] sm:h-[520px] lg:h-[680px] object-cover transition-transform duration-300 group-hover:scale-105"
						alt="Selected room"
					/>
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
					<div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						Open Viewer
					</div>
					<div className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
						{selectedImageIndex + 1} of {images.length}
					</div>
				</div>

				{/* THUMBNAILS */}
				<div className="flex gap-3 overflow-x-auto pb-2">
					{images.map((img, i) => (
						<img
							key={i}
							src={img}
							onClick={() => setSelectedImageIndex(i)}
							className={`w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 flex-shrink-0
                                ${
												i === selectedImageIndex
													? "border-blue-500"
													: "border-gray-200 hover:border-gray-300"
											}`}
							alt={`Room ${i + 1}`}
						/>
					))}
				</div>

				{/* AMENITIES */}
				<Amenities />

				<RoomImageViewer
					open={galleryOpen}
					onOpenChange={setGalleryOpen}
					images={images}
					selectedImageIndex={selectedImageIndex}
					onSelectImage={setSelectedImageIndex}
					roomType={room_type || roomType}
				/>
			</div>

			{/* RIGHT SIDE — FORM */}
			<div className="lg:w-[44%] space-y-6 mt-6 mb-10">
				<h2 className="text-2xl font-semibold">Book {roomType} Room</h2>

				<Form type={room_type} />

				<Separator />

				{onSale && saleValue != null && (
					<div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
						<span className="text-lg text-gray-400 line-through">
							₹{price}
						</span>
						<span className="text-2xl font-bold text-green-700">
							₹{saleValue}
						</span>
						<span className="text-sm font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
							ON SALE
						</span>
					</div>
				)}

				<Button
					onClick={handleBookAndPay}
					disabled={isPending || isProcessing}
					className="w-full py-3 text-lg"
				>
					{buttonText}
				</Button>

				{/* Caution Box */}
				<div className="border-2 border-red-500 rounded-lg p-5 bg-red-50 mt-6">
					<div className="flex items-start gap-3 mb-3">
						<div className="flex-shrink-0 mt-0.5">
							<svg
								className="w-5 h-5 text-red-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="flex-1">
							<h4 className="text-red-800 font-semibold text-base mb-3">
								Important Booking Rules & Policies
							</h4>
							<ul className="space-y-2 text-red-700 text-sm leading-relaxed">
								<li className="flex items-start gap-2">
									<span className="text-red-600 font-bold mt-0.5">
										•
									</span>
									<span>
										We do not accept local IDs. In case of bookings
										from local IDs, fees shall not be refunded.
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-red-600 font-bold mt-0.5">
										•
									</span>
									<span>Unmarried couples are not allowed.</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-red-600 font-bold mt-0.5">
										•
									</span>
									<span>
										Only proper and government authorized Aadhar Card
										/ Voter ID / Driving License are allowed. Failure
										to do so will result in only 80% of fees to be
										refundable.
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-red-600 font-bold mt-0.5">
										•
									</span>
									<span>
										For extra beds, please contact at the Reception.
									</span>
								</li>

								<li className="pt-4 border-t border-red-200">
									<h5 className="font-bold underline italic text-red-800 mb-2">
										Cancellation Policy :
									</h5>
									<ol className="list-decimal list-inside space-y-2 ml-1 text-red-700">
										<li>
											Cancellations made 15 or more days before
											check-in date will be free.
										</li>
										<li>
											Cancellations made more than 7 days in advance
											but less than 15 days will incur a cancellation
											charge of 1 night tariff as retention charges.
										</li>
										<li>
											No shows and cancellations made 0 to 7 days in
											advance will incur 100% charge of the booking.
										</li>
									</ol>
								</li>

								<li className="pt-2">
									<h5 className="font-bold underline italic text-red-800 mb-2">
										Amendment Policy :
									</h5>
									<ol className="list-decimal list-inside space-y-2 ml-1 text-red-700">
										<li>
											Amendments will be treated as cancellation.
										</li>
										<li>
											Any refund will take at least 15 days to
											process.
										</li>
									</ol>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
