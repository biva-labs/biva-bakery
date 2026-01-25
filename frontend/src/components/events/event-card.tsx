import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

type EventCardProps = {
    date: string;
    event_name: string;
    group_name: string;
    event_id: string;
    position: string;
    public_id: string;
    ticket_price: string;
    time: string;
    url: string;
};

export default function EventCard(props: EventCardProps) {
    const navigate = useNavigate();

    const isExpired = useMemo(() => {
        try {
            if (!props.date) return false;
            
            // Remove ordinal suffixes (st, nd, rd, th) from the date string
            // e.g., "12th Jan 2025" -> "12 Jan 2025"
            const cleanDate = props.date.replace(/(\d+)(st|nd|rd|th)/g, "$1");
            
            // Combine date and time if available
            const dateTimeStr = props.time 
                ? `${cleanDate} ${props.time}` 
                : cleanDate;
            
            const eventDate = new Date(dateTimeStr);
            
            // Check if date is valid
            if (isNaN(eventDate.getTime())) {
                console.warn("Invalid date format for event:", props.event_name, dateTimeStr);
                return false;
            }
            
            return eventDate < new Date();
        } catch (e) {
            console.error("Error parsing event date:", e);
            return false;
        }
    }, [props.date, props.time, props.event_name]);

    console.log("PROPS", props);

    const handleBookNow = () => {
        if (isExpired) return;
        
        const searchParams = new URLSearchParams({
            eventId: props.event_id,
            eventName: props.event_name,
            groupName: props.group_name,
            date: props.date,
            time: props.time,
            price: props.ticket_price,
            publicId: props.public_id,
            imageUrl: props.url,
        });
        navigate(`/events/booking?${searchParams.toString()}`);
    };

    return (
        <div className="group relative mx-auto flex w-full max-w-sm flex-col overflow-hidden p-0 shadow-md transition-transform hover:scale-105 hover:shadow-lg">
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-2px] rounded-lg blur-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "conic-gradient(from 0deg, #ff004d, #ff8a00, #ffd500, #3cff6e, #00d4ff, #7a5cff, #ff004d)",
                    zIndex: -1,
                }}
            />

            <Card className="relative z-10 flex h-full w-full flex-col overflow-hidden p-0">
                <div className="relative h-[65vh] max-h-[1000px] w-full overflow-hidden bg-black sm:h-[55vh] md:h-[60vh] lg:h-[65vh]">
                    <img
                        loading="lazy"
                        src={props.url}
                        alt={props.event_name || "event"}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity ${
                            isExpired ? "grayscale" : ""
                        }`}
                    />
                    {isExpired && (
                        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                             {/* Optional: Add "Expired" text if desired, but user just asked for layover */}
                             {/* <span className="text-white font-bold text-xl uppercase tracking-widest border-2 border-white px-4 py-2 rounded">Expired</span> */}
                        </div>
                    )}
                </div>

                {!isExpired && (
                    <div className="absolute bottom-4 right-4 z-20 md:hidden">
                        <Button
                            onClick={handleBookNow}
                            className="outfit rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg bg-[#002a3a]"
                        >
                            Book Now
                        </Button>
                    </div>
                )}

                {!isExpired && (
                    <div className="absolute inset-0 hidden items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
                        <div className="group relative inline-block rounded-full p-[6px]">
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-full blur-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                style={{
                                    background:
                                        "conic-gradient(from 0deg, #ff004d, #ff8a00, #ffd500, #3cff6e, #00d4ff, #7a5cff, #ff004d)",
                                    zIndex: 0,
                                }}
                            />
                            <Button
                                onClick={handleBookNow}
                                className="outfit relative z-10 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg bg-[#002a3a]"
                            >
                                <span className="relative z-10 transition-opacity group-hover:opacity-0">
                                    Book Now
                                </span>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <span className="outfit font-semibold">
                                        Book Now
                                    </span>
                                </span>
                            </Button>
                        </div>
                    </div>
                )}
            </Card>

            <style>{`
        /* Spin the conic gradient ring for the button */
        .group:hover > span[aria-hidden='true'],
        .group:focus-within > span[aria-hidden='true'] {
          opacity: 1;
          animation: spin-ring var(--spin-duration, 2.2s) linear infinite;
        }
        @keyframes spin-ring {
          to {
            transform: rotate(360deg);
          }
        }
        /* Animate background-position for the inner text */
        .group:hover span[aria-hidden='true'] > span,
        .group:focus-within span[aria-hidden='true'] > span {
          animation: move-bg 3.5s linear infinite;
        }
        @keyframes move-bg {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        /* New: Animate the card's border */
        .group:hover > span:first-of-type,
        .group:focus-within > span:first-of-type {
          animation: spin-card-border var(--spin-duration, 5s) linear infinite;
        }
        @keyframes spin-card-border {
          to {
            transform: rotate(360deg);
          }
        }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .group:hover > span,
          .group:focus-within > span {
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}
