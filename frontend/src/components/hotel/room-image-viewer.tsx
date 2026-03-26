import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Minus, Plus, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RoomImageViewerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    images: string[];
    selectedImageIndex: number;
    onSelectImage: (index: number) => void;
    roomType: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export default function RoomImageViewer({
    open,
    onOpenChange,
    images,
    selectedImageIndex,
    onSelectImage,
    roomType,
}: RoomImageViewerProps) {
    const [zoom, setZoom] = useState(MIN_ZOOM);

    const selectedImage = images[selectedImageIndex] ?? "";

    useEffect(() => {
        if (open) {
            setZoom(MIN_ZOOM);
        }
    }, [open, selectedImageIndex]);

    const zoomText = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom]);

    const handleZoomIn = () => {
        setZoom((prev) =>
            Math.min(MAX_ZOOM, Number((prev + ZOOM_STEP).toFixed(2))),
        );
    };

    const handleZoomOut = () => {
        setZoom((prev) =>
            Math.max(MIN_ZOOM, Number((prev - ZOOM_STEP).toFixed(2))),
        );
    };

    const handleResetZoom = () => {
        setZoom(MIN_ZOOM);
    };

    const handleOpenInNewTab = () => {
        if (!selectedImage) return;
        window.open(selectedImage, "_blank", "noopener,noreferrer");
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" />

                <Dialog.Content className="fixed inset-0 z-50 h-[100dvh] w-screen max-w-none bg-background outline-none sm:left-1/2 sm:top-1/2 sm:h-[95vh] sm:w-[96vw] sm:max-w-[1600px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border sm:border-white/15 sm:shadow-2xl">
                    <div className="flex h-full flex-col">
                        <div className="flex flex-col gap-2 border-b border-border/60 px-3 py-3 sm:flex-row sm:items-center sm:justify-between md:px-5">
                            <Dialog.Title className="max-w-full truncate text-sm font-semibold capitalize md:text-base">
                                {roomType} room images
                            </Dialog.Title>

                            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleOpenInNewTab}
                                    disabled={!selectedImage}
                                    className="h-8 px-2 md:px-3"
                                >
                                    <ExternalLink className="size-4" />
                                    <span className="hidden sm:inline">New tab</span>
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="size-8"
                                    onClick={handleZoomOut}
                                    disabled={zoom <= MIN_ZOOM}
                                >
                                    <Minus className="size-4" />
                                </Button>

                                <div className="w-12 text-center text-xs font-medium tabular-nums md:w-14 md:text-sm">
                                    {zoomText}
                                </div>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="size-8"
                                    onClick={handleZoomIn}
                                    disabled={zoom >= MAX_ZOOM}
                                >
                                    <Plus className="size-4" />
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-2 md:px-3"
                                    onClick={handleResetZoom}
                                    disabled={zoom === MIN_ZOOM}
                                >
                                    <RotateCcw className="size-4" />
                                    <span className="hidden sm:inline">Reset</span>
                                </Button>
                                </div>

                                <Dialog.Close asChild>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="size-8"
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </Dialog.Close>
                            </div>
                        </div>

                        <div className="grid min-h-0 flex-1 grid-rows-[1fr_auto]">
                            <div className="min-h-0 overflow-x-auto overflow-y-auto bg-muted/30 touch-pan-x touch-pan-y [-webkit-overflow-scrolling:touch]">
                                {selectedImage ? (
                                    <div className="min-h-full p-2 sm:p-3 md:p-4">
                                        <div
                                            style={{
                                                width: `${zoom * 100}%`,
                                                minWidth: "100%",
                                            }}
                                        >
                                            <img
                                                src={selectedImage}
                                                alt={`Room image ${selectedImageIndex + 1}`}
                                                className="block w-full max-w-none rounded-lg"
                                                style={{
                                                    height: "auto",
                                                }}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                        No image available
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-border/60 bg-background px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] sm:px-3 sm:py-3 md:px-5">
                                <div className="overflow-x-auto overflow-y-hidden pb-1 touch-pan-x [-webkit-overflow-scrolling:touch]">
                                    <div className="flex w-max gap-2 pr-1">
                                        {images.map((img, index) => (
                                            <button
                                                type="button"
                                                key={`${img}-${index}`}
                                                onClick={() => onSelectImage(index)}
                                                className={cn(
                                                    "h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all sm:h-16 sm:w-24 md:h-20 md:w-32",
                                                    selectedImageIndex === index
                                                        ? "border-primary ring-2 ring-primary/30"
                                                        : "border-border/70 hover:border-foreground/30",
                                                )}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
