import { useEffect, useMemo, useState } from "react";

interface PreloaderProps {
    isLoading: boolean;
    imageSources?: string[];
    videoSources?: string[];
    pageKey?: string;
}

const EMPTY_SOURCES: string[] = [];
const FADE_DURATION_MS = 400;
const MIN_VISIBLE_MS = 500;
const RESOURCE_TIMEOUT_MS = 12000;
const PRELOADED_PAGES_STORAGE_KEY = "biva-preloaded-pages-v1";
const DEFAULT_PAGE_KEY = "route:/";

function resolvePageKey(pageKey?: string) {
    const trimmed = pageKey?.trim();

    if (trimmed) {
        return trimmed;
    }

    if (typeof window !== "undefined") {
        return `route:${window.location.pathname}`;
    }

    return DEFAULT_PAGE_KEY;
}

function sleep(duration: number) {
    return new Promise<void>((resolve) => {
        window.setTimeout(resolve, duration);
    });
}

function dismissHtmlPreloader() {
    const htmlPreloader = document.getElementById("app-preloader");

    if (!htmlPreloader || htmlPreloader.dataset.dismissed === "true") {
        return;
    }

    htmlPreloader.dataset.dismissed = "true";
    htmlPreloader.classList.add("fade-out");

    window.setTimeout(() => {
        htmlPreloader.remove();
    }, FADE_DURATION_MS);
}

function readPreloadedPages() {
    if (typeof window === "undefined") {
        return new Set<string>();
    }

    try {
        const value = window.localStorage.getItem(PRELOADED_PAGES_STORAGE_KEY);

        if (!value) {
            return new Set<string>();
        }

        const parsed = JSON.parse(value);

        if (!Array.isArray(parsed)) {
            return new Set<string>();
        }

        return new Set(
            parsed.filter(
                (item): item is string =>
                    typeof item === "string" && item.trim().length > 0,
            ),
        );
    } catch {
        return new Set<string>();
    }
}

function writePreloadedPages(pages: Set<string>) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(
            PRELOADED_PAGES_STORAGE_KEY,
            JSON.stringify([...pages]),
        );
    } catch {
        // ignore storage failures
    }
}

function isPagePreloaded(pageKey: string) {
    const pages = readPreloadedPages();
    return pages.has(pageKey);
}

function markPageAsPreloaded(pageKey: string) {
    const pages = readPreloadedPages();

    if (pages.has(pageKey)) {
        return;
    }

    pages.add(pageKey);
    writePreloadedPages(pages);
}

function preloadImage(src: string) {
    return new Promise<void>((resolve) => {
        const image = new Image();
        let settled = false;

        const finish = () => {
            if (settled) {
                return;
            }

            settled = true;
            window.clearTimeout(timeoutId);
            resolve();
        };

        const timeoutId = window.setTimeout(finish, RESOURCE_TIMEOUT_MS);

        image.onload = finish;
        image.onerror = finish;
        image.decoding = "async";
        image.src = src;

        if (image.complete) {
            finish();
        }
    });
}

function preloadVideo(src: string) {
    return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        let settled = false;

        const cleanup = () => {
            video.removeEventListener("loadeddata", finish);
            video.removeEventListener("canplaythrough", finish);
            video.removeEventListener("error", finish);
            video.pause();
            video.removeAttribute("src");
            video.load();
        };

        const finish = () => {
            if (settled) {
                return;
            }

            settled = true;
            window.clearTimeout(timeoutId);
            cleanup();
            resolve();
        };

        const timeoutId = window.setTimeout(finish, RESOURCE_TIMEOUT_MS);

        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        video.addEventListener("loadeddata", finish);
        video.addEventListener("canplaythrough", finish);
        video.addEventListener("error", finish);
        video.src = src;
        video.load();

        if (video.readyState >= 2) {
            finish();
        }
    });
}

export default function Preloader({
    isLoading,
    imageSources = EMPTY_SOURCES,
    videoSources = EMPTY_SOURCES,
    pageKey,
}: PreloaderProps) {
    const resolvedPageKey = resolvePageKey(pageKey);

    const [hasLoadedPage, setHasLoadedPage] = useState(() =>
        isPagePreloaded(resolvedPageKey),
    );
    const [visible, setVisible] = useState(() => !isPagePreloaded(resolvedPageKey));
    const [fading, setFading] = useState(false);

    const resources = useMemo(() => {
        const uniqueImages = [...new Set(imageSources.filter(Boolean))];
        const uniqueVideos = [...new Set(videoSources.filter(Boolean))];

        return [
            ...uniqueImages.map((src) => ({ type: "image" as const, src })),
            ...uniqueVideos.map((src) => ({ type: "video" as const, src })),
        ];
    }, [imageSources, videoSources]);

    useEffect(() => {
        const preloaded = isPagePreloaded(resolvedPageKey);
        setHasLoadedPage(preloaded);
        setVisible(!preloaded);
        setFading(false);

        if (preloaded) {
            dismissHtmlPreloader();
        }
    }, [resolvedPageKey]);

    useEffect(() => {
        let cancelled = false;
        let hideTimer: number | undefined;

        const finishLoading = async () => {
            await sleep(MIN_VISIBLE_MS);

            if (cancelled) {
                return;
            }

            markPageAsPreloaded(resolvedPageKey);
            setHasLoadedPage(true);
            dismissHtmlPreloader();
            setFading(true);
            hideTimer = window.setTimeout(() => {
                if (!cancelled) {
                    setVisible(false);
                }
            }, FADE_DURATION_MS);
        };

        const loadResources = async () => {
            if (hasLoadedPage) {
                setVisible(false);
                dismissHtmlPreloader();
                return;
            }

            setVisible(true);
            setFading(false);

            if (isLoading) {
                return;
            }

            await Promise.allSettled(
                resources.map((resource) => {
                    if (resource.type === "video") {
                        return preloadVideo(resource.src);
                    }

                    return preloadImage(resource.src);
                }),
            );

            if (!cancelled) {
                await finishLoading();
            }
        };

        void loadResources();

        return () => {
            cancelled = true;
            if (hideTimer) {
                window.clearTimeout(hideTimer);
            }
        };
    }, [hasLoadedPage, isLoading, resolvedPageKey, resources]);

    useEffect(() => {
        if (!visible) {
            dismissHtmlPreloader();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            style={{
                transition: `opacity ${FADE_DURATION_MS}ms ease`,
                opacity: fading ? 0 : 1,
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-white"
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-neutral-200 border-t-[#DE4243]" />
                <p className="text-sm font-medium tracking-[0.24em] text-neutral-500 uppercase">
                    Loading
                </p>
            </div>
        </div>
    );
}
