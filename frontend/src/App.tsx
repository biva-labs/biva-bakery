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
import PrivacyPolicy from "./pages/privacy-policy";
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
    console.log("Announcements fetched:", announcements);
    const [dismissedIds, setDismissedIds] = useState<Set<string>>(() => {
        // Initialize from sessionStorage
        try {
            const stored = sessionStorage.getItem("dismissedAnnouncementIds");
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    });

    // Early return if no data
    if (!announcements || announcements.length === 0) {
        onBannerChange(false);
        return null;
    }

    const DEFAULT_STYLING = {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        fontSize: "md" as "sm" | "md" | "lg",
        alignment: "center" as "center" | "left" | "right"
    };

    // Filter and parse all active announcements
    const activeAnnouncements = announcements
        .filter((announcement) => {
            // Filter out dismissed announcements
            const announcementId =
                announcement.id ||
                `${announcement.title}-${announcement.body}`
                    .replace(/\s+/g, "-")
                    .toLowerCase();
            
            if (dismissedIds.has(String(announcementId))) {
                return false;
            }

            // Filter out announcements with empty title AND empty body
            if (!announcement.title?.trim() && !announcement.body?.trim()) {
                return false;
            }

            return true;
        })
        .map((announcement) => {
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
            }

            return {
                ...announcement,
                styling: parsedStyling,
            };
        });

    // Check if any active banner exists
    const hasBannerAnnouncement = activeAnnouncements.some(
        (a) => a.displayType === "banner"
    );

    // Sync with parent
    useEffect(() => {
        onBannerChange(hasBannerAnnouncement);
    }, [hasBannerAnnouncement, onBannerChange]);

    // If no active announcements, render nothing
    if (activeAnnouncements.length === 0) return null;

    const handleDismiss = (announcementId: string) => {
        const newDismissedIds = new Set(dismissedIds);
        newDismissedIds.add(announcementId);
        setDismissedIds(newDismissedIds);

        try {
            sessionStorage.setItem(
                "dismissedAnnouncementIds",
                JSON.stringify([...newDismissedIds])
            );
        } catch (err) {
            console.warn("SessionStorage write error:", err);
        }
    };

    const renderAnnouncement = (announcement: any) => {
        const announcementId = String(
            announcement.id ||
            `${announcement.title}-${announcement.body}`
                .replace(/\s+/g, "-")
                .toLowerCase()
        );

        // Extract all required props for the template
        const componentProps = {
            title: announcement.title || "",
            body: announcement.body || "",
            image: announcement.image || "",
            styling: announcement.styling, // Already parsed in activeAnnouncements
            displayType: announcement.displayType,
            onClose: () => handleDismiss(announcementId),
        };

        console.log(`Rendering ${announcement.displayType}:`, {
            title: componentProps.title,
            body: componentProps.body,
            hasImage: !!componentProps.image,
            imageUrl: componentProps.image,
            styling: componentProps.styling,
        });

        switch (announcement.displayType) {
            case "banner":
                return <BannerTemplate key={announcementId} {...componentProps} />;
            case "modal":
                return <ModalTemplate key={announcementId} {...componentProps} />;
            case "notification":
                return <NotificationTemplate key={announcementId} {...componentProps} />;
            case "popup":
                return <PopupTemplate key={announcementId} {...componentProps} />;
            default:
                console.warn(`Unknown displayType: ${announcement.displayType}`);
                return null;
        }
    };

    return <>{activeAnnouncements.map(renderAnnouncement)}</>;
};
function App() {
    const [hasBanner, setHasBanner] = useState(true);

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
        >
            <BrowserRouter>
                {/* <SmoothScroll /> */}
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
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
