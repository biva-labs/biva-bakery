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

const MOCK_ANNOUNCEMENT = {
    id: "mock-announcement-1",
    title: "Welcome to the Event!",
    body: "Enjoy exclusive discounts today.",
    image: "",
    displayType: "notification",
    styling: {
        alignment: "center",
        backgroundColor: "#ffffff",
        borderColor: "#e2e8f0",
        fontSize: "md",
        textColor: "#000000",
    },
};

const AnnouncementDisplay: React.FC = () => {
    const { data, isError, isLoading } = useAnnouncements();
    const [isDismissed, setIsDismissed] = useState(false);

    // ---------------------------------------------------
    // FIX: Your backend returns { data: announcementObj }
    // ---------------------------------------------------
    const announcement =
        data && typeof data === "object" && data !== null && data?.id
            ? data
            : MOCK_ANNOUNCEMENT;

    console.log("Announcement:", announcement);

    // Generate ID early and safely
    const announcementId =
        announcement.id ||
        `${announcement.title}-${announcement.body}`
            .replace(/\s+/g, "-")
            .toLowerCase();

    // Always called hook (safe)
    useEffect(() => {
        try {
            const dismissed = sessionStorage.getItem("dismissedAnnouncementId");
            setIsDismissed(dismissed === announcementId);
        } catch (err) {
            console.warn("SessionStorage error:", err);
        }
    }, [announcementId]);

    // Early exits after hooks
    if (isLoading) return null;
    if (isError) return null;
    if (!announcement) return null;
    if (isDismissed) return null;

    // Dismiss
    const handleDismiss = () => {
        try {
            sessionStorage.setItem("dismissedAnnouncementId", announcementId);
        } catch (err) {
            console.warn("SessionStorage write error:", err);
        }
        setIsDismissed(true);
    };

    const props = { ...announcement, onClose: handleDismiss };

    // Render template
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
            console.warn("Unknown displayType:", announcement.displayType);
            return null;
    }
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
