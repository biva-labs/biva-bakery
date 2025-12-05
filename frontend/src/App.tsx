import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";

import Main from "./layout/main";
import Biva from "./layout/page";
import Hotel from "./pages/hotel";
import FoodCourt from "./pages/food-court";
import Table from "./pages/table";
import Bakery from "./pages/bakery";
import SeatBookingPage from "./components/food-court/seat-booking-page";
import ChatBot from "./components/chatbot/chatbot";
import About from "./pages/about";
import BookingConfirmation from "./components/bookings";
import { RoomBookingPage } from "./components/hotel/room-booking-page";
import Ticket from "./ticket";
import { useAnnouncements } from "./hooks/useAnnouncements";
import {
    BannerTemplate,
    ModalTemplate,
    NotificationTemplate,
    PopupTemplate,
} from "./components/announcement-templates";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 5,
        },
    },
});

const asyncStoragePersister = createAsyncStoragePersister({
    storage: window.localStorage,
});

function ScrollToHash() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    return null;
}

// Error Fallback Component
function AnnouncementErrorFallback() {
    return null; // Silently fail - don't show anything if announcement crashes
}

// Safe Announcement Display Component
const SafeAnnouncementDisplay: React.FC = () => {
    return (
        <ErrorBoundary
            FallbackComponent={AnnouncementErrorFallback}
            onError={(error) => {
                console.warn("Announcement component error:", error);
            }}
        >
            <AnnouncementDisplay />
        </ErrorBoundary>
    );
};

// Announcement Display Component
// Announcement Display Component
const AnnouncementDisplay: React.FC = () => {
    const { data: announcements } = useAnnouncements();
    console.log("ANNOUNCEMENTS", announcements);
    const [isDismissed, setIsDismissed] = useState(false);

    // Get the first active announcement
    const announcement =
        announcements?.find((ann) => ann.isActive) || announcements?.[0];

    // Load dismissed state from sessionStorage on component mount
    useEffect(() => {
        try {
            if (announcement) {
                // Create a unique ID if one doesn't exist
                const announcementId =
                    announcement.id ||
                    `${announcement.title}-${announcement.body}`
                        .replace(/\s/g, "-")
                        .toLowerCase();
                const dismissed = sessionStorage.getItem(
                    "dismissedAnnouncementId",
                );
                setIsDismissed(dismissed === announcementId);
            }
        } catch (error) {
            console.warn("Error accessing sessionStorage:", error);
        }
    }, [announcement]);

    // Don't show if no announcement or dismissed
    if (!announcement || isDismissed) {
        return null;
    }

    const handleDismiss = () => {
        try {
            // Store the dismissed announcement ID in sessionStorage
            const announcementId =
                announcement.id ||
                `${announcement.title}-${announcement.body}`
                    .replace(/\s/g, "-")
                    .toLowerCase();
            sessionStorage.setItem("dismissedAnnouncementId", announcementId);
            setIsDismissed(true);
        } catch (error) {
            console.warn("Error saving to sessionStorage:", error);
            setIsDismissed(true); // Still dismiss the announcement
        }
    };

    const renderAnnouncement = () => {
        try {
            const props = {
                ...announcement,
                onClose: handleDismiss,
            };

            switch (announcement.displayType) {
                case "banner":
                    return <BannerTemplate {...props} />;
                case "modal":
                    return <ModalTemplate {...props} />;
                case "notification":
                    return <NotificationTemplate {...props} />;
                case "popup":
                    return <PopupTemplate {...props} />;
                default:
                    console.warn(
                        "Unknown display type:",
                        announcement.displayType,
                    );
                    return null;
            }
        } catch (error) {
            console.warn("Error rendering announcement:", error);
            return null;
        }
    };

    return renderAnnouncement();
};

function App() {
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >
            <BrowserRouter>
                <ScrollToHash />
                <SafeAnnouncementDisplay />
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route path="/" element={<Biva />}>
                            <Route path="/" element={<Hotel />} />
                            <Route path="/food" element={<FoodCourt />} />
                            <Route path="/bakery" element={<Bakery />} />
                        </Route>
                        <Route
                            path="/table/booking"
                            element={<SeatBookingPage />}
                        />
                        <Route
                            path="/booking-confirmation"
                            element={<BookingConfirmation />}
                        />
                        <Route path="/events/booking" element={<Table />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/booking/:type"
                            element={<RoomBookingPage />}
                        />
                        <Route path="/ticket" element={<Ticket />} />
                    </Route>
                </Routes>
                <ChatBot />
                <Toaster richColors position="top-center" />
            </BrowserRouter>
        </PersistQueryClientProvider>
    );
}

export default App;
