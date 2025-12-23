import React, { useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useHotelStore } from "@/store/hotel-store";
import { useRoomDeatils } from "@/hooks/useRoomDetails";

const calculateTotalDays = (joinDate: string, leaveDate: string): number => {
    if (!joinDate || !leaveDate) {
        return 0;
    }

    // Normalize to midnight to avoid timezone issues when parsing YYYY-MM-DD strings
    const start = new Date(joinDate + "T00:00:00");
    const end = new Date(leaveDate + "T00:00:00");

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return 0;
    }

    if (end < start) {
        return 0;
    }

    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    // Checkout day is not included in billing
    return Math.floor(dayDifference);
};

const formatDateISO = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
};

const addDays = (date: Date, days: number) => {
    const r = new Date(date);
    r.setDate(r.getDate() + days);
    return r;
};

type BookingRaw = {
    join_date: string; // incoming may be "yyyy-mm-dd" or "dd-mm-yyyy" or similar
    leave_date: string;
};

type Booking = {
    join_date: string; // normalized "yyyy-mm-dd"
    leave_date: string; // normalized "yyyy-mm-dd"
};

interface HotelCalendarProps {
    selectedJoinDate: string;
    selectedLeaveDate: string;
    onJoinDateSelect: (date: string) => void;
    onLeaveDateSelect: (date: string) => void;
    guests: number; // number of guests selected by user
    totalRooms: number; // total rooms in hotel
    bookings: Booking[]; // normalized yyyy-mm-dd
    occupancy: number; // people per room
}

/**
 * Try to parse a date string that might be either:
 *  - "yyyy-mm-dd" (ISO)
 *  - "dd-mm-yyyy"
 *  - other Date() parsable variants
 * Returns a Date object (local time) or null if invalid.
 */
const parseDateFlexible = (s: string): Date | null => {
    if (!s) return null;
    const isoMatch = /^\d{4}-\d{2}-\d{2}$/.test(s);
    const dmyMatch = /^\d{2}-\d{2}-\d{4}$/.test(s);

    if (isoMatch) {
        const [y, m, d] = s.split("-").map(Number);
        return new Date(y, m - 1, d);
    }

    if (dmyMatch) {
        const [dd, mm, yyyy] = s.split("-").map(Number);
        const d = new Date(yyyy, mm - 1, dd);
        return isNaN(d.getTime()) ? null : d;
    }

    // fallback
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
};

/**
 * Hotel booking calendar that:
 * - calculates roomsRequired from guests and occupancy
 * - blocks days where availableRooms < roomsRequired
 */
function HotelBookingCalendar({
    selectedJoinDate,
    selectedLeaveDate,
    onJoinDateSelect,
    onLeaveDateSelect,
    guests,
    totalRooms,
    bookings,
    occupancy,
}: HotelCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // rooms needed based on guests and occupancy
    const requiredRooms = useMemo(() => {
        if (!occupancy || occupancy <= 0) return 1;
        return Math.floor(guests / occupancy);
    }, [guests, occupancy]);

    // Build bookingMap: dateStr ("yyyy-mm-dd") -> number of booked rooms on that date
    const bookingMap = useMemo(() => {
        const map: Record<string, number> = {};

        bookings.forEach((b) => {
            const start = parseDateFlexible(b.join_date);
            const end = parseDateFlexible(b.leave_date);

            if (!start || !end) return;

            // We treat leave_date as checkout day; bookings occupy rooms from check-in up to (but not including) checkout
            // This allows new guests to check in on the same day previous guests check out
            const current = new Date(start);
            while (current < end) {
                const dateStr = formatDateISO(current);
                map[dateStr] = (map[dateStr] || 0) + 1; // each booking occupies 1 room
                current.setDate(current.getDate() + 1);
            }
        });

        return map;
    }, [bookings]);

    const getDateAvailability = (dateStr: string) => {
        const bookedRooms = bookingMap[dateStr] || 0;
        const availableRooms = Math.max(totalRooms - bookedRooms, 0);
        return {
            availableRooms,
            totalRooms,
            isBooked: availableRooms === 0,
            hasEnoughRooms: availableRooms >= requiredRooms,
        };
    };

    // If any date in [start, end) has availableRooms < requiredRooms -> invalid
    const isRangeValid = (startDateISO: string, endDateISO: string) => {
        if (!startDateISO || !endDateISO) return true;
        const start = parseDateFlexible(startDateISO);
        const end = parseDateFlexible(endDateISO);
        if (!start || !end) return false;

        const cur = new Date(start);
        while (cur < end) {
            const ds = parseDateFlexible(cur);
            const avail = getDateAvailability(ds);
            if (avail.availableRooms < requiredRooms) return false;
            cur.setDate(cur.getDate() + 1);
        }
        return true;
    };

    // Check a single date whether it's selectable
    const isDateBlocked = (date: Date) => {
        const dateStr = formatDateISO(date);
        const avail = getDateAvailability(dateStr);
        return avail.availableRooms < requiredRooms;
    };

    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay()); // start from Sunday of week 1

        const days: {
            date: Date;
            dateStr: string;
            isCurrentMonth: boolean;
            isPastDate: boolean;
            availability: ReturnType<typeof getDateAvailability>;
            isSelected: boolean;
            isInRange: boolean;
            isBlocked: boolean;
        }[] = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dateStr = formatDateISO(date);
            const isCurrentMonth = date.getMonth() === month;
            const isPastDate = date < today;
            const availability = getDateAvailability(dateStr);

            const isSelected =
                (selectedJoinDate && dateStr === selectedJoinDate) ||
                (selectedLeaveDate && dateStr === selectedLeaveDate);

            const isInRange =
                selectedJoinDate &&
                selectedLeaveDate &&
                dateStr > selectedJoinDate &&
                dateStr < selectedLeaveDate;

            const isBlocked = !availability.hasEnoughRooms || isPastDate;

            days.push({
                date,
                dateStr,
                isCurrentMonth,
                isPastDate,
                availability,
                isSelected,
                isInRange,
                isBlocked,
            });
        }

        return days;
    }, [
        currentMonth,
        selectedJoinDate,
        selectedLeaveDate,
        bookingMap,
        guests,
        totalRooms,
        occupancy,
    ]);

    const handleDateClick = (
        dateStr: string,
        isPastDate: boolean,
        availability: any,
    ) => {
        if (isPastDate) return;
        // if the single date cannot satisfy required rooms, ignore
        if (isPastDate || availability.availableRooms < requiredRooms) return;

        if (!selectedJoinDate || (selectedJoinDate && selectedLeaveDate)) {
            // start new selection
            onJoinDateSelect(dateStr);
            onLeaveDateSelect("");
        } else if (selectedJoinDate && !selectedLeaveDate) {
            // if clicking same date => ignore (don't allow same-day check-in/check-out)
            if (dateStr === selectedJoinDate) {
                return;
            }

            // if earlier date -> restart selection
            if (dateStr < selectedJoinDate) {
                onJoinDateSelect(dateStr);
                onLeaveDateSelect("");
                return;
            }

            // check the whole range [selectedJoinDate, dateStr)
            if (isRangeValid(selectedJoinDate, dateStr)) {
                onLeaveDateSelect(dateStr);
            } else {
                // range crosses blocked date -> start a new selection on clicked date
                onJoinDateSelect(dateStr);
                onLeaveDateSelect("");
            }
        }
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
            return newDate;
        });
    };

    const formatMonthYear = (date: Date) =>
        date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("prev")}
                >
                    ←
                </Button>
                <h3 className="text-lg font-semibold">
                    {formatMonthYear(currentMonth)}
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("next")}
                >
                    →
                </Button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div
                        key={d}
                        className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                    const {
                        date,
                        dateStr,
                        isCurrentMonth,
                        isPastDate,
                        availability,
                        isSelected,
                        isInRange,
                        isBlocked,
                    } = day;

                    let className =
                        "h-12 text-xs border border-gray-100 flex flex-col items-center justify-center cursor-pointer transition-colors relative p-1";

                    if (!isCurrentMonth) {
                        className += " text-gray-300";
                    } else if (isPastDate) {
                        className +=
                            " text-gray-300 cursor-not-allowed bg-gray-50";
                    } else if (isSelected) {
                        className += " bg-blue-500 text-white";
                    } else if (isInRange) {
                        className += " bg-blue-100 text-blue-800";
                    } else if (
                        availability.isBooked ||
                        availability.availableRooms === 0
                    ) {
                        className +=
                            " bg-red-100 text-red-800 cursor-not-allowed";
                    } else if (!availability.hasEnoughRooms) {
                        className +=
                            " bg-orange-100 text-orange-800 cursor-not-allowed";
                    } else {
                        className +=
                            " bg-green-50 hover:bg-green-100 text-green-800";
                    }

                    return (
                        <div
                            key={idx}
                            className={className}
                            onClick={() =>
                                handleDateClick(
                                    dateStr,
                                    isPastDate,
                                    availability,
                                )
                            }
                        >
                            <span className="font-medium">
                                {date.getDate()}
                            </span>
                            {isCurrentMonth && !isPastDate && (
                                <span className="text-[10px] leading-none">
                                    {availability.availableRooms}/
                                    {availability.totalRooms}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/*<div className="mt-4 space-y-1 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-50 border border-green-200"></div>
                    <span>
                        Available ({requiredRooms} room
                        {requiredRooms > 1 ? "s" : ""} required)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-100 border border-orange-200"></div>
                    <span>Insufficient rooms</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-100 border border-red-200"></div>
                    <span>Fully booked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500"></div>
                    <span>Selected</span>
                </div>
            </div>

            {selectedJoinDate &&
                selectedLeaveDate &&
                !isRangeValid(selectedJoinDate, selectedLeaveDate) && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        Cannot book this range - insufficient rooms available
                        for {requiredRooms} room{requiredRooms > 1 ? "s" : ""}
                    </div>
                )}

            {selectedJoinDate && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <div className="font-medium mb-1">
                        Selected Period Availability:
                    </div>
                    {(() => {
                        const start =
                            parseDateFlexible(selectedJoinDate) ||
                            new Date(selectedJoinDate);
                        const end = selectedLeaveDate
                            ? parseDateFlexible(selectedLeaveDate) ||
                              new Date(selectedLeaveDate)
                            : start;
                        const arr: {
                            date: string;
                            available: number;
                            total: number;
                        }[] = [];
                        const cur = new Date(start);
                        while (cur <= end) {
                            const ds = formatDateISO(cur);
                            const av = getDateAvailability(ds);
                            arr.push({
                                date: ds,
                                available: av.availableRooms,
                                total: av.totalRooms,
                            });
                            cur.setDate(cur.getDate() + 1);
                        }
                        return arr.map((info) => (
                            <div
                                key={info.date}
                                className="text-[10px] text-blue-700"
                            >
                                {info.date}: {info.available}/{info.total} rooms
                            </div>
                        ));
                    })()}
                </div>
            )}*/}
        </div>
    );
}

/**
 * Full Form (parent) component that uses HotelBookingCalendar.
 * - uses useRoomDeatils(type) to fetch hotel data
 * - shows a "Number of guests" select
 * - computes roomsRequired and passes it down
 *
 * NOTE: this uses useHotelForm() only for join_date and leave_data fields (keeps your existing store usage).
 */
export default function Form({ type }: { type: string }) {
    const hotelStore = useHotelStore();
    const [guests, setGuests] = useState<number>(
        Number(hotelStore.total_people || 0),
    );

    const { data } = useRoomDeatils(type);
    // data?.res?.occupied assumed to be array of objects with joinDate/leaveDate (strings) — flexible parsing handles dd-mm-yyyy or yyyy-mm-dd
    const occupiedRaw: any[] = data?.res?.occupied || [];
    const total_rooms: number = Number(
        data?.res?.unoccupied?.[0]?.totalRooms || 0,
    );
    const occupancy: number = Number(
        data?.res?.unoccupied?.[0]?.occupancy || 1,
    );

    function parseDateToYMD(raw: string | undefined): string | null {
        if (!raw) return null;

        // Case A: yyyy-mm-dd (already correct)
        if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

        // Case B: dd-mm-yyyy → convert manually
        const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
        if (m) {
            const [_, dd, mm, yyyy] = m;
            return `${yyyy}-${mm}-${dd}`;
        }

        return null;
    }

    // Build normalized bookings array in yyyy-mm-dd format
    const bookings: Booking[] = useMemo(() => {
        const out: Booking[] = [];
        occupiedRaw.forEach((b) => {
            const rawJoin = b.joinDate;
            const rawLeave = b.leaveDate;

            // NEW: produce timezone-safe strings only
            const joinD = parseDateToYMD(rawJoin);
            const leaveD = parseDateToYMD(rawLeave);

            if (!joinD || !leaveD) return;

            out.push({
                join_date: joinD, // ALWAYS "yyyy-mm-dd"
                leave_date: leaveD,
            });
        });
        return out;
    }, [occupiedRaw]);

    // compute rooms required based on guests & occupancy
    const roomsRequired = useMemo(() => {
        if (!occupancy || occupancy <= 0) return 1;
        hotelStore.setField(
            "total_rooms",
            Math.ceil(guests / occupancy).toString(),
        );
        return Math.ceil(guests / occupancy);
    }, [guests, occupancy]);

    const setJoinDate = (d: string) => hotelStore.setField("join_date", d);
    const setLeaveDate = (d: string) => hotelStore.setField("leave_date", d);
    const total_days = useMemo(() => {
        if (hotelStore.join_date && hotelStore.leave_date) {
            return calculateTotalDays(
                hotelStore.join_date,
                hotelStore.leave_date,
            );
        }
        return 0; // Default value if dates are not set
    }, [hotelStore.join_date, hotelStore.leave_date]);

    useEffect(() => {
        hotelStore.setField("total_days", total_days.toString());
    }, [total_days]);

    useEffect(() => {
        if (hotelStore.join_date && hotelStore.leave_date) {
            // revalidate range with new room requirements
            const newValid = (() => {
                const start = hotelStore.join_date;
                const end = hotelStore.leave_date;

                const startD = parseDateFlexible(start);
                const endD = parseDateFlexible(end);
                if (!startD || !endD) return false;

                const cur = new Date(startD);
                while (cur < endD) {
                    const ds = formatDateISO(cur);
                    const booked = bookings.filter(
                        (b) => b.join_date <= ds && b.leave_date >= ds,
                    ).length;
                    const available = total_rooms - booked;

                    if (available < roomsRequired) return false;

                    cur.setDate(cur.getDate() + 1);
                }
                return true;
            })();

            // ❌ Range invalid → clear leave_date
            if (!newValid) {
                hotelStore.setField("join_date", "");
                hotelStore.setField("leave_date", "");
            }
        }
    }, [guests, occupancy, roomsRequired]);

    // console.log("TOTAL_DAYS:", total_days);
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Hotel Booking
                    </h2>

                    <div className="space-y-4">
                        {/* Small form fields (reuse your HOTEL_FORM_FIELDS if you want) */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter your full name"
                                value={(hotelStore as any).name || ""}
                                onChange={(e) =>
                                    hotelStore.setField("name", e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Enter your email"
                                value={(hotelStore as any).email || ""}
                                onChange={(e) =>
                                    hotelStore.setField("email", e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="phone"
                                className="text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                placeholder="Enter your email"
                                value={(hotelStore as any).phone_number || ""}
                                onChange={(e) =>
                                    hotelStore.setField(
                                        "phone_number",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Adhaar/PAN Image
                            </Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        hotelStore.setFile(file);
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="join-date"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Check-in Date
                                </Label>
                                <Input
                                    id="join-date"
                                    type="date"
                                    disabled={true}
                                    value={hotelStore.join_date || ""}
                                    onChange={(e) =>
                                        setJoinDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="leave-date"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Check-out Date
                                </Label>
                                <Input
                                    id="leave-date"
                                    type="date"
                                    disabled={true}
                                    value={hotelStore.leave_date || ""}
                                    onChange={(e) =>
                                        setLeaveDate(e.target.value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Number of Guests
                                </Label>
                                <Select
                                    value={String(guests)}
                                    onValueChange={(v) => {
                                        setGuests(v);
                                        hotelStore.setField("total_people", v);
                                    }}
                                >
                                    <SelectTrigger className="w-full h-10">
                                        <SelectValue placeholder="Select guests" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
                                            (n) => (
                                                <SelectItem
                                                    key={n}
                                                    value={String(n)}
                                                >
                                                    {n} Guest{n > 1 ? "s" : ""}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <div className="text-xs text-gray-500 mt-1">
                                    Occupancy per room: {occupancy} person
                                    {occupancy > 1 ? "s" : ""} • Rooms needed:{" "}
                                    {roomsRequired}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800">
                        Calendar
                    </h3>
                    <p className="text-sm text-gray-600">
                        Showing availability for{" "}
                        <strong>{roomsRequired}</strong> room
                        {roomsRequired > 1 ? "s" : ""} (for {guests} guest
                        {guests > 1 ? "s" : ""})
                    </p>

                    <HotelBookingCalendar
                        selectedJoinDate={hotelStore.join_date || ""}
                        selectedLeaveDate={hotelStore.leave_date || ""}
                        onJoinDateSelect={(d) => setJoinDate(d)}
                        onLeaveDateSelect={(d) => setLeaveDate(d)}
                        guests={guests}
                        totalRooms={total_rooms}
                        bookings={bookings}
                        occupancy={occupancy}
                    />
                </div>
            </div>
        </div>
    );
}
