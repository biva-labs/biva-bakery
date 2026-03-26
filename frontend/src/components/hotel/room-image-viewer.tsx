import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
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

export default function RoomImageViewer({
    open,
    onOpenChange,
    images,
    selectedImageIndex,
    onSelectImage,
    roomType,
}: RoomImageViewerProps) {
    const selectedImage = images[selectedImageIndex] ?? "";

    const handleOpenInNewTab = () => {
        if (!selectedImage) {
            return;
        }

        window.open(selectedImage, "_blank", "noopener,noreferrer");
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" />

                <Dialog.Content className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden bg-background outline-none sm:left-1/2 sm:top-1/2 sm:h-[95vh] sm:w-[96vw] sm:max-w-[1600px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border sm:border-white/15 sm:shadow-2xl">
                    <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2 sm:px-4 sm:py-3 md:px-5">
                            <Dialog.Title className="max-w-[60vw] truncate text-sm font-semibold capitalize md:text-base">
                                {roomType} room images
                            </Dialog.Title>

                            <div className="flex items-center gap-2">
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

                        <div className="min-h-0 flex-1 bg-black/85 px-2 py-2 sm:px-4 sm:py-4">
                            {selectedImage ? (
                                <div className="flex h-full w-full items-center justify-center">
                                    <img
                                        src={selectedImage}
                                        alt={`Room image ${selectedImageIndex + 1}`}
                                        className="h-full w-full object-contain"
                                        draggable={false}
                                    />
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                    No image available
                                </div>
                            )}
                        </div>

                        <div className="border-t border-border/60 bg-background px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] sm:px-3 sm:py-3 md:px-5">
                            <div
                                className="overflow-x-auto overflow-y-hidden pb-1"
                                style={{
                                    touchAction: "pan-x",
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                <div className="flex min-w-max gap-2 pr-1">
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
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
