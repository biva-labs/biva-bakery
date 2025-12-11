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

// // mock data //

// const MOCK_DATA = {
//     body: "enjoy stuff",
//     displayType: "modal",
//     id: "mock-announcement-1",
//     image: "",
//     styling: {
//         alignment: "center",
//         backgroundColor: "#ffffff",
//         borderColor: "#e2e8f0",
//         fontSize: "md",
//         textColor: "#000000",
//     },
//     title: "welcome to solchar!",
// }

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
const SafeAnnouncementDisplay: React.FC<{ onBannerChange: (hasBanner: boolean) => void }> = ({ onBannerChange }) => {
    return (
        <ErrorBoundary
            FallbackComponent={AnnouncementErrorFallback}
            onError={(error) => {
                console.warn("Announcement component error:", error);
            }}
        >
            <div className="fixed top-0 left-0 right-0 z-[9999]">
                <AnnouncementDisplay onBannerChange={onBannerChange} />
            </div>
        </ErrorBoundary>
    );
};

// Announcement Display Component
const AnnouncementDisplay: React.FC<{ onBannerChange: (hasBanner: boolean) => void }> = ({ onBannerChange }) => {
    const { data: announcements } = useAnnouncements();
    const announcement = announcements?.[0]; // Get the first announcement
    // const announcement = MOCK_DATA;
    console.log("ANNOUNCE", announcement);
    const [isDismissed, setIsDismissed] = useState(false);

    console.log(data);

    // const announcement =
    //     data && typeof data === "object" ? data : MOCK_ANNOUNCEMENT;

    console.log("Announcement:", announcement);

    const announcementId =
        announcement.id ||
        `${announcement.title}-${announcement.body}`
            .replace(/\s+/g, "-")
            .toLowerCase();

    useEffect(() => {
        try {
            const dismissed = sessionStorage.getItem("dismissedAnnouncementId");
            setIsDismissed(dismissed === announcementId);
        } catch (err) {
            console.warn("SessionStorage error:", err);
        }
    }, [announcementId]);

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
    const [hasBanner, setHasBanner] = useState(false);

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >
            <BrowserRouter>
                <ScrollToHash />
                <SafeAnnouncementDisplay onBannerChange={setHasBanner} />
                <div style={{ paddingTop: hasBanner ? '80px' : '0' }}>
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
                </div>
                <ChatBot />
                <Toaster richColors position="top-center" />
            </BrowserRouter>
        </PersistQueryClientProvider>
    );
}

export default App;
