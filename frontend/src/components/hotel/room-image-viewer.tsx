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

                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[95vh] w-[96vw] max-w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-background shadow-2xl outline-none">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-3 md:px-5">
                            <Dialog.Title className="text-sm font-semibold capitalize md:text-base">
                                {roomType} room images
                            </Dialog.Title>

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

                                <div className="w-14 text-center text-xs font-medium tabular-nums md:text-sm">
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
                            <div className="min-h-0 overflow-auto bg-muted/30">
                                {selectedImage ? (
                                    <div className="min-h-full min-w-full p-2 md:p-4">
                                        <img
                                            src={selectedImage}
                                            alt={`Room image ${selectedImageIndex + 1}`}
                                            className="block rounded-lg"
                                            style={{
                                                width: `${zoom * 100}%`,
                                                minWidth: "100%",
                                                maxWidth: "none",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                        No image available
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-border/60 bg-background px-3 py-3 md:px-5">
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {images.map((img, index) => (
                                        <button
                                            type="button"
                                            key={`${img}-${index}`}
                                            onClick={() => onSelectImage(index)}
                                            className={cn(
                                                "h-16 w-24 shrink-0 overflow-hidden rounded-md border transition-all md:h-20 md:w-32",
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
