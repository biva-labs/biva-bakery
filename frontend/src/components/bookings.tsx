import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAllBookingsForm } from "@/hooks/useAllBookings";

// Type definitions for the three booking types
export type HotelBookingType = {
    id: number;
    applicationId: string;
    name: string;
    email: string;
    aadharOrPanImgUrl: string;
    phoneNumber: string;
    roomType: string;
    totalPeople: number;
    totalRooms: number;
    paid: boolean;
    totalAmount: number;
    joinDate: string;
    leaveDate: string;
    createdAt: string;
};

export type FoodCourtBookingType = {
    id: number;
    name: string;
    email: string;
    foodPreference: string;
    timeSlot: string;
    aadharOrPanImgUrl: string;
    phoneNumber: string;
    totalPeople: number;
    paid: boolean;
    totalAmount: number;
    createdAt: string;
    status: string;
};

export type EventBookingType = {
    id: number;
    name: string;
    email: string;
    aadharOrPanImgUrl: string;
    phoneNumber: string;
    totalPeople: number;
    eventId: string;
    paid: boolean;
    totalAmount: number;
    createdAt: string;
    status: string;
};

// Type for the API response structure
type AllBookingsResponse = {
    hotel: HotelBookingType[];
    "food-court": FoodCourtBookingType[];
    events: EventBookingType[];
};

export default function BookingConfirmation() {
    const [activeTab, setActiveTab] = useState<"hotel" | "food" | "events">(
        "hotel",
    );
    const [bookingsData, setBookingsData] =
        useState<AllBookingsResponse | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const location = useLocation();
    const allBookingsMutation = useAllBookingsForm();

    // Get email from navigation state
    const email = location.state?.email;

    const handleFetchBookings = async (emailToFetch: string) => {
        if (!emailToFetch?.trim()) {
            console.error("No email provided");
            return;
        }

        try {
            const response = await allBookingsMutation.mutateAsync({
                email: emailToFetch.trim(),
            });
            console.log(response);
            setBookingsData(response.data.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            setBookingsData(null);
        }
    };

    // Fetch bookings automatically when component mounts
    useEffect(() => {
        if (email && isInitialLoad) {
            handleFetchBookings(email);
            setIsInitialLoad(false);
        }
    }, [email, isInitialLoad]);

    const TabButton = ({
        tab,
        label,
        isActive,
        onClick,
    }: {
        tab: string;
        label: string;
        isActive: boolean;
        onClick: () => void;
    }) => (
        <Button
            variant={isActive ? "default" : "outline"}
            onClick={onClick}
            className="flex-1"
        >
            {label}
        </Button>
    );

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString();

    const HotelTable = ({ data }: { data: HotelBookingType[] }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Application ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Room Type
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            People
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rooms
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-in
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-out
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {booking.id}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {booking.applicationId}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking.name}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.email}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.phoneNumber}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.roomType}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.totalPeople}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.totalRooms}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {formatCurrency(booking.totalAmount)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            booking.paid
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {booking.paid ? "Paid" : "Pending"}
                                    </span>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(booking.joinDate)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(booking.leaveDate)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={12}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No hotel bookings found for this email.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const FoodCourtTable = ({ data }: { data: FoodCourtBookingType[] }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Food Preferences
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time Slot
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            People
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {booking.id}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking.name}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.email}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.phoneNumber}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.foodPreference}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.timeSlot}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.totalPeople}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {formatCurrency(booking.totalAmount)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            booking.paid
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {booking.status ||
                                            (booking.paid ? "Paid" : "Pending")}
                                    </span>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(booking.createdAt)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={10}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No food court bookings found for this email.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    const EventsTable = ({ data }: { data: EventBookingType[] }) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Event ID
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            People
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {booking.id}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking.name}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.email}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.phoneNumber}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.eventId}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {booking.totalPeople}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {formatCurrency(booking.totalAmount)}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            booking.paid
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {booking.status ||
                                            (booking.paid ? "Paid" : "Pending")}
                                    </span>
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(booking.createdAt)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={9}
                                className="px-4 py-8 text-center text-gray-500"
                            >
                                No event bookings found for this email.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    // Get current tab data
    const getCurrentTabData = () => {
        if (!bookingsData) return [];

        switch (activeTab) {
            case "hotel":
                return bookingsData.hotel || [];
            case "food":
                return bookingsData["food-court"] || [];
            case "events":
                return bookingsData.events || [];
            default:
                return [];
        }
    };

    // Show error state if no email is provided
    if (!email) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No Email Provided
                        </h3>
                        <p className="text-gray-500">
                            Please access this page through the email form to
                            view your bookings.
                        </p>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Booking Management
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Viewing bookings for:{" "}
                        <span className="font-medium">{email}</span>
                    </p>
                </div>

                {/* Loading State */}
                {allBookingsMutation.isPending && (
                    <Card className="p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Loading Bookings...
                        </h3>
                        <p className="text-gray-500">
                            Fetching your booking information.
                        </p>
                    </Card>
                )}

                {/* Error State */}
                {allBookingsMutation.isError && (
                    <Card className="p-8 text-center">
                        <h3 className="text-lg font-medium text-red-600 mb-2">
                            Error Loading Bookings
                        </h3>
                        <p className="text-gray-500 mb-4">
                            We couldn't fetch your booking information. Please
                            try again.
                        </p>
                        <Button onClick={() => handleFetchBookings(email)}>
                            Retry
                        </Button>
                    </Card>
                )}

                {bookingsData && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Hotel Bookings
                                </h3>
                                <p className="text-2xl font-bold text-blue-600">
                                    {bookingsData.hotel?.length || 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Total Revenue:{" "}
                                    {formatCurrency(
                                        (bookingsData.hotel || []).reduce(
                                            (sum, b) => sum + b.totalAmount,
                                            0,
                                        ),
                                    )}
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Food Court Bookings
                                </h3>
                                <p className="text-2xl font-bold text-green-600">
                                    {bookingsData["food-court"]?.length || 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Total Revenue:{" "}
                                    {formatCurrency(
                                        (
                                            bookingsData["food-court"] || []
                                        ).reduce(
                                            (sum, b) => sum + b.totalAmount,
                                            0,
                                        ),
                                    )}
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Event Bookings
                                </h3>
                                <p className="text-2xl font-bold text-purple-600">
                                    {bookingsData.events?.length || 0}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Total Revenue:{" "}
                                    {formatCurrency(
                                        (bookingsData.events || []).reduce(
                                            (sum, b) => sum + b.totalAmount,
                                            0,
                                        ),
                                    )}
                                </p>
                            </Card>
                        </div>

                        {/* Tab Navigation */}
                        <Card className="mb-6">
                            <div className="p-4 border-b">
                                <h2 className="text-xl font-bold text-gray-900">
                                    Booking Details
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="flex space-x-2 mb-6">
                                    <TabButton
                                        tab="hotel"
                                        label={`Hotel (${bookingsData.hotel?.length || 0})`}
                                        isActive={activeTab === "hotel"}
                                        onClick={() => setActiveTab("hotel")}
                                    />
                                    <TabButton
                                        tab="food"
                                        label={`Food Court (${bookingsData["food-court"]?.length || 0})`}
                                        isActive={activeTab === "food"}
                                        onClick={() => setActiveTab("food")}
                                    />
                                    <TabButton
                                        tab="events"
                                        label={`Events (${bookingsData.events?.length || 0})`}
                                        isActive={activeTab === "events"}
                                        onClick={() => setActiveTab("events")}
                                    />
                                </div>

                                {/* Table Content */}
                                {activeTab === "hotel" && (
                                    <HotelTable
                                        data={bookingsData.hotel || []}
                                    />
                                )}
                                {activeTab === "food" && (
                                    <FoodCourtTable
                                        data={bookingsData["food-court"] || []}
                                    />
                                )}
                                {activeTab === "events" && (
                                    <EventsTable
                                        data={bookingsData.events || []}
                                    />
                                )}
                            </div>
                        </Card>
                    </>
                )}

                {/* No data state */}
                {bookingsData && !allBookingsMutation.isPending && (
                    <div className="mt-4">
                        {bookingsData.hotel?.length === 0 &&
                            bookingsData["food-court"]?.length === 0 &&
                            bookingsData.events?.length === 0 && (
                                <Card className="p-8 text-center">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        No Bookings Found
                                    </h3>
                                    <p className="text-gray-500">
                                        No bookings were found for the email:{" "}
                                        {email}
                                    </p>
                                </Card>
                            )}
                    </div>
                )}
            </div>
        </div>
    );
}
