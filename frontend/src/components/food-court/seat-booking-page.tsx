
import { Button } from "@radix-ui/themes";
import PayButton from "../pay-button";
import SeatForm from "../seat-form";
import { useLocation } from "react-router-dom";
import { useFoodCourtTableFormStore } from "@/store/food-court-store";

export default function SeatBookingPage() {
    const location = useLocation();
    const isFoodCourt = location.pathname.includes('/table/booking');

    const data = useFoodCourtTableFormStore();


    const run = () => {
        console.log(data);
    }

    return (
        <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
            <div className="lg:w-1/2 flex flex-col items-center justify-center px-4 py-4">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl outfit font-bold text-gray-900 text-center mb-6 underline">
                        Book Your Seat
                    </h1>
                    <div className={`bg-white rounded-lg p-4 mb-3 ${isFoodCourt ? 'max-h-[60vh] md:max-h-none overflow-y-auto' : ''}`}>
                        <SeatForm />
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        {/* <PayButton amount={100}/> */}
                        <Button onClick={run}>click</Button>
                    </div>
                </div>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center bg-gray-100">
                <video 
                    className="w-full h-full object-cover" 
                    autoPlay 
                    muted 
                    loop
                >
                    <source src="/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}