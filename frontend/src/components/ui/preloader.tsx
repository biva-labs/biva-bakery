import { useState, useEffect } from "react";

interface PreloaderProps {
    isLoading: boolean;
}

export default function Preloader({ isLoading }: PreloaderProps) {
    // visible controls whether the DOM node exists at all
    const [visible, setVisible] = useState(isLoading);
    // fading controls the opacity transition
    const [fading, setFading] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            // Start the fade-out
            setFading(true);
            // Unmount after the transition finishes (400 ms matches CSS duration)
            const timer = setTimeout(() => setVisible(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!visible) return null;

    return (
        <div
            style={{
                transition: "opacity 400ms ease",
                opacity: fading ? 0 : 1,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
            <img
                src="/biva-logo.webp"
                alt="Biva logo"
                className="w-40 animate-pulse select-none"
                draggable={false}
            />
        </div>
    );
}
