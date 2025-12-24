import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";
import { X, Bell } from "lucide-react";

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

// Types
interface AnnouncementStyling {
    backgroundColor: string;
    textColor: string;
    fontSize: "sm" | "md" | "lg";
    alignment: "left" | "center" | "right";
}

interface Announcement {
    id: number;
    title: string;
    body: string;
    image: string;
    displayType: "banner" | "modal" | "notification" | "popup";
    styling: string | AnnouncementStyling;
}

// Helper to parse styling
const parseStyling = (styling: string | AnnouncementStyling): AnnouncementStyling => {
    const defaults: AnnouncementStyling = {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        fontSize: "md",
        alignment: "center",
    };
    
    if (typeof styling === "string") {
        try {
            return { ...defaults, ...JSON.parse(styling) };
        } catch {
            return defaults;
        }
    }
    return { ...defaults, ...styling };
};

// Helper to get font size in pixels
const getFontSize = (size: "sm" | "md" | "lg"): string => {
    switch (size) {
        case "sm": return "14px";
        case "lg": return "18px";
        default: return "16px";
    }
};

// Announcement Components with inline CSS
const AnnouncementBanner: React.FC<{
    announcement: Announcement;
    styling: AnnouncementStyling;
    onClose: () => void;
}> = ({ announcement, styling, onClose }) => (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 9999,
            backgroundColor: styling.backgroundColor,
            color: styling.textColor,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            borderBottom: "1px solid #e5e7eb",
        }}
    >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
            {announcement.image && (
                <img
                    src={announcement.image}
                    alt=""
                    style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                />
            )}
            <div style={{ flex: 1, textAlign: styling.alignment }}>
                <h4 style={{ fontWeight: 600, marginBottom: "4px", fontSize: getFontSize(styling.fontSize) }}>
                    {announcement.title}
                </h4>
                <p style={{ fontSize: "14px", opacity: 0.9 }}>{announcement.body}</p>
            </div>
            <button onClick={onClose} style={{ padding: "4px", opacity: 0.7, background: "none", border: "none", cursor: "pointer", color: styling.textColor }}>
                <X size={20} />
            </button>
        </div>
    </div>
);

const AnnouncementModal: React.FC<{
    announcement: Announcement;
    styling: AnnouncementStyling;
    onClose: () => void;
}> = ({ announcement, styling, onClose }) => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "16px",
        }}
    >
        <div
            style={{
                backgroundColor: styling.backgroundColor,
                color: styling.textColor,
                borderRadius: "8px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                maxWidth: "400px",
                width: "100%",
                overflow: "hidden",
            }}
        >
            {announcement.image && (
                <img src={announcement.image} alt="" style={{ width: "100%", height: "192px", objectFit: "cover" }} />
            )}
            <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                    <h4 style={{ fontWeight: 600, fontSize: getFontSize(styling.fontSize) }}>{announcement.title}</h4>
                    <button onClick={onClose} style={{ padding: "4px", opacity: 0.7, background: "none", border: "none", cursor: "pointer", color: styling.textColor }}>
                        <X size={20} />
                    </button>
                </div>
                <p style={{ textAlign: styling.alignment, fontSize: getFontSize(styling.fontSize), opacity: 0.9, marginBottom: "16px" }}>
                    {announcement.body}
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={onClose} style={{ padding: "8px 16px", backgroundColor: "#f3f4f6", borderRadius: "4px", border: "none", cursor: "pointer" }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const AnnouncementNotification: React.FC<{
    announcement: Announcement;
    styling: AnnouncementStyling;
    onClose: () => void;
}> = ({ announcement, styling, onClose }) => (
    <div
        style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 9999,
            maxWidth: "320px",
        }}
    >
        <div
            style={{
                backgroundColor: styling.backgroundColor,
                color: styling.textColor,
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
            }}
        >
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                <Bell size={20} style={{ marginTop: "2px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 500, fontSize: getFontSize(styling.fontSize), marginBottom: "4px" }}>{announcement.title}</h4>
                    <p style={{ fontSize: "14px" }}>{announcement.body}</p>
                </div>
                <button onClick={onClose} style={{ padding: "4px", opacity: 0.5, background: "none", border: "none", cursor: "pointer", color: styling.textColor }}>
                    <X size={16} />
                </button>
            </div>
        </div>
    </div>
);

const AnnouncementPopup: React.FC<{
    announcement: Announcement;
    styling: AnnouncementStyling;
    onClose: () => void;
}> = ({ announcement, styling, onClose }) => (
    <div
        style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
            maxWidth: "320px",
        }}
    >
        <div
            style={{
                backgroundColor: styling.backgroundColor,
                color: styling.textColor,
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                <h4 style={{ fontWeight: 500, fontSize: getFontSize(styling.fontSize) }}>{announcement.title}</h4>
                <button onClick={onClose} style={{ padding: "4px", opacity: 0.5, background: "none", border: "none", cursor: "pointer", color: styling.textColor }}>
                    <X size={16} />
                </button>
            </div>
            {announcement.image && (
                <img src={announcement.image} alt="" style={{ width: "100%", height: "128px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }} />
            )}
            <p style={{ textAlign: styling.alignment, fontSize: getFontSize(styling.fontSize), opacity: 0.85 }}>{announcement.body}</p>
        </div>
    </div>
);

// Main Announcements Component - fetches directly with axios
const Announcements: React.FC<{ onBannerChange: (has: boolean) => void }> = ({ onBannerChange }) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [dismissed, setDismissed] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await axios.get("https://biva-bakery-backend.onrender.com/announcements");
                console.log("Fetched announcements:", res.data);
                
                if (res.data?.data && Array.isArray(res.data.data)) {
                    setAnnouncements(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch announcements:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Filter valid announcements (has title or body)
    const validAnnouncements = announcements.filter(
        (a) => !dismissed.has(a.id) && (a.title?.trim() || a.body?.trim())
    );

    // Check for banner
    useEffect(() => {
        const hasBanner = validAnnouncements.some((a) => a.displayType === "banner");
        onBannerChange(hasBanner);
    }, [validAnnouncements, onBannerChange]);

    const handleDismiss = (id: number) => {
        setDismissed((prev) => new Set([...prev, id]));
    };

    if (loading || validAnnouncements.length === 0) {
        return null;
    }

    return (
        <>
            {validAnnouncements.map((announcement) => {
                const styling = parseStyling(announcement.styling);
                const onClose = () => handleDismiss(announcement.id);

                console.log(`Rendering ${announcement.displayType}:`, { announcement, styling });

                switch (announcement.displayType) {
                    case "banner":
                        return <AnnouncementBanner key={announcement.id} announcement={announcement} styling={styling} onClose={onClose} />;
                    case "modal":
                        return <AnnouncementModal key={announcement.id} announcement={announcement} styling={styling} onClose={onClose} />;
                    case "notification":
                        return <AnnouncementNotification key={announcement.id} announcement={announcement} styling={styling} onClose={onClose} />;
                    case "popup":
                        return <AnnouncementPopup key={announcement.id} announcement={announcement} styling={styling} onClose={onClose} />;
                    default:
                        return null;
                }
            })}
        </>
    );
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
                <Announcements onBannerChange={setHasBanner} />
                <div
                    style={{
                        marginTop: hasBanner ? "80px" : "0",
                        transition: "margin-top 0.3s ease",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Main />}>
                            <Route path="/" element={<Biva />}>
                                <Route path="/" element={<Hotel />} />
                                <Route path="/food" element={<FoodCourt />} />
                                <Route path="/bakery" element={<Bakery />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route
                                    path="/privacy-policy"
                                    element={<PrivacyPolicy />}
                                />
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
