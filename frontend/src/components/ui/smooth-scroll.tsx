"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.3, // Higher duration for "heavier" feel (default is 1.2)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slightly lower speed for more weight
            touchMultiplier: 1.5,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
