import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/ui/smooth-scroll";
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
import Contact from "./pages/contact";
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
const SafeAnnouncementDisplay: React.FC<{
    onBannerChange: (hasBanner: boolean) => void;
}> = ({ onBannerChange }) => {
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
const AnnouncementDisplay: React.FC<{
    onBannerChange: (hasBanner: boolean) => void;
}> = ({ onBannerChange }) => {
    const { data: announcements } = useAnnouncements();
    const [isDismissed, setIsDismissed] = useState(false);

    // 1. Get the current announcement (if any)
    const announcement = announcements?.[0];

    // 2. Determine if we should show a banner
    // It must be a banner type, have data, and not be dismissed
    const shouldShowBanner =
        !!announcement && announcement.displayType === "banner" && !isDismissed;

    // 3. Sync with parent (App.tsx)
    // This tells App to add the top padding
    useEffect(() => {
        onBannerChange(shouldShowBanner);
    }, [shouldShowBanner, onBannerChange]);

    // Early return if no data
    if (!announcement) return null;

    // Parsing Logic
    const DEFAULT_STYLING = {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        fontSize: "md" as "sm" | "md" | "lg",
        alignment: "center" as "center" | "left" | "right"
    };

    let parsedStyling = DEFAULT_STYLING;
    try {
        if (typeof announcement.styling === "string") {
            const parsed = JSON.parse(announcement.styling);
            parsedStyling = { ...DEFAULT_STYLING, ...parsed };
        } else if (announcement.styling) {
            parsedStyling = { ...DEFAULT_STYLING, ...announcement.styling };
        }
    } catch (e) {
        console.error("Failed to parse announcement styling JSON:", e);
        parsedStyling = DEFAULT_STYLING;
    }

    const announcementWithParsedStyling = {
        ...announcement,
        styling: parsedStyling,
    };

    const announcementId =
        announcement.id ||
        `${announcement.title}-${announcement.body}`
            .replace(/\s+/g, "-")
            .toLowerCase();

    // If dismissed, render nothing (The useEffect above already told parent to remove padding)
    if (isDismissed) return null;

    const handleDismiss = () => {
        try {
            sessionStorage.setItem("dismissedAnnouncementId", announcementId);
        } catch (err) {
            console.warn("SessionStorage write error:", err);
        }
        setIsDismissed(true);
    };

    const props = { ...announcementWithParsedStyling, onClose: handleDismiss };

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
            return null;
    }
};
function App() {
    const [hasBanner, setHasBanner] = useState(true);

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >
            <BrowserRouter>
                <SmoothScroll />
                <ScrollToHash />
                <SafeAnnouncementDisplay onBannerChange={setHasBanner} />
                <div style={{ top: hasBanner ? "80px" : "0" }}>
                    <Routes>
                        <Route path="/" element={<Main />}>
                            <Route path="/" element={<Biva />}>
                                <Route path="/" element={<Hotel />} />
                                <Route path="/food" element={<FoodCourt />} />
                                <Route path="/bakery" element={<Bakery />} />
                                <Route path="/contact" element={<Contact />} />
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
