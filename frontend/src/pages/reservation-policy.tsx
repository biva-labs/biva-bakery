export default function ReservationPolicy() {
    return (
        <div className="min-h-screen bg-white py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="prose prose-slate lg:prose-lg max-w-none">
                    <div className="mb-12 border-b border-slate-100 pb-8 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold outfit text-[#002a3a] mb-4">Reservation Policy</h1>
                        <p className="text-gray-500 font-medium">Last updated: December 18, 2025</p>
                    </div>

                    <div className="space-y-8 text-slate-700 leading-relaxed font-outfit">
                        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-[#002a3a] mb-6 outfit">Reservation Policy</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Early check-in or late check-out is strictly subjected to availability at the time of check-in and may incur additional charges.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Advance deposit in Cash or online Payment is mandatory to obtain the confirmed reservation.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>A Valid Govt Photo id with address is required (PASSPORT/ADHAAR CARD/DRIVING LICENCE/VOTER ID CARD). PAN card is not accepted as a photo id.</p>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-orange-50/30 p-8 rounded-3xl border border-orange-100">
                            <h2 className="text-2xl font-bold text-[#002a3a] mb-6 outfit">Cancellation Policy</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Cancellations made 15 or more days before check-in date will be free.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Cancellations made more than 7 days in advance but less than 15 days will incur a cancellation charge of 1 night tariff as retention charges.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>No shows and cancellations made 0 to 7 days in advance will incur 100% charge of the booking.</p>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <h2 className="text-2xl font-bold text-[#002a3a] mb-6 outfit">Amendment Policy</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Amendments will be treated as cancellation.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Any refund will take at least 15 days to process.</p>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-orange-50/30 p-8 rounded-3xl border border-orange-100">
                            <h2 className="text-2xl font-bold text-[#002a3a] mb-6 outfit">Other Information</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Outside food & drinks are not allowed in the hotel premises.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Unmarried couples & local ID is not allowed.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Pets are not allowed.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Rights of admission reserved.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Visitors are not allowed in the room with prior consultation with the Front Office.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-orange-400 text-xl flex-shrink-0 mt-1">🔹</span>
                                    <p>Housekeeping room cleaning service is available upon request.</p>
                                </li>
                            </ul>
                        </section>

                        <section className="pt-12 border-t border-slate-100 text-center">
                            <h2 className="text-2xl font-bold text-[#002a3a] mb-4 outfit">Contact Us</h2>
                            <p className="mb-6 text-gray-600">If you have any questions about this Reservation Policy, You can contact us:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="font-bold text-sm text-orange-500 uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-xs font-semibold">hello@thebiva.com</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="font-bold text-sm text-orange-500 uppercase tracking-wider mb-1">Website</p>
                                    <p className="text-xs font-semibold">www.thebiva.com</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="font-bold text-sm text-orange-500 uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-xs font-semibold">+91 81359 38393</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl">
                                    <p className="font-bold text-sm text-orange-500 uppercase tracking-wider mb-1">Mail</p>
                                    <p className="text-[10px] font-semibold">Hailakandi Road, Silchar, Assam, 788005</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}