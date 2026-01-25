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

function parseTimeTo24h(timeStr: string) {
    if (!timeStr) return null;

    const trimmed = timeStr.trim().toLowerCase();
    const match = trimmed.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    const meridiem = match[3];

    if (meridiem) {
        if (meridiem === "pm" && hours < 12) hours += 12;
        if (meridiem === "am" && hours === 12) hours = 0;
    }

    return { hours, minutes };
}

function parseDateParts(cleanDate: string) {
    const slashMatch = cleanDate.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
    if (slashMatch) {
        const day = parseInt(slashMatch[1], 10);
        const month = parseInt(slashMatch[2], 10);
        let year = parseInt(slashMatch[3], 10);
        if (year < 100) year += 2000;
        return { year, monthIndex: month - 1, day };
    }
    return null;
}

function parseMonthName(name: string) {
    const month = name.trim().toLowerCase();
    const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];
    const index = months.findIndex((m) => m.startsWith(month));
    return index >= 0 ? index : null;
}

function parseEventDate(dateStr: string, timeStr: string) {
    if (!dateStr) return null;

    // Remove ordinal suffixes like 1st, 2nd, 3rd, 4th, etc.
    const cleanDate = dateStr.replace(/(\d+)(st|nd|rd|th)/gi, "$1").trim();
    const timeParts = parseTimeTo24h(timeStr);

    const dateParts = parseDateParts(cleanDate);
    if (dateParts) {
        const { year, monthIndex, day } = dateParts;
        const hours = timeParts ? timeParts.hours : 23;
        const minutes = timeParts ? timeParts.minutes : 59;
        return new Date(year, monthIndex, day, hours, minutes);
    }

    const monthNameMatch = cleanDate.match(/^(\d{1,2})\s+([a-zA-Z]+)(?:\s+(\d{2,4}))?$/);
    if (monthNameMatch) {
        const day = parseInt(monthNameMatch[1], 10);
        const monthIndex = parseMonthName(monthNameMatch[2]);
        let year = monthNameMatch[3]
            ? parseInt(monthNameMatch[3], 10)
            : new Date().getFullYear();

        if (year < 100) year += 2000;

        if (monthIndex !== null) {
            const hours = timeParts ? timeParts.hours : 23;
            const minutes = timeParts ? timeParts.minutes : 59;
            return new Date(year, monthIndex, day, hours, minutes);
        }
    }

    const combined = timeStr ? `${cleanDate} ${timeStr}` : cleanDate;
    const parsed = new Date(combined);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed;
    }

    // Fallback: try date-only parsing (end of day)
    const dateOnly = new Date(cleanDate);
    if (!Number.isNaN(dateOnly.getTime())) {
        dateOnly.setHours(23, 59, 0, 0);
        return dateOnly;
    }

    return null;
}

export default function EventCard(props: EventCardProps) {
    const navigate = useNavigate();

    const isExpired = useMemo(() => {
        const eventDate = parseEventDate(props.date, props.time);
        if (!eventDate) return false;
        return eventDate.getTime() < new Date().getTime();
    }, [props.date, props.time]);

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
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                            <span className="rounded-full border-2 border-white px-6 py-2 text-lg font-bold uppercase tracking-widest text-white">
                                EXPIRED
                            </span>
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