import { useState, type ImgHTMLAttributes } from "react";
import { IKImage } from "imagekitio-react";

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    quality?: number;
    useTransform?: boolean;
}

const DEFAULT_QUALITY = 80;
const THUMB_QUALITY = 10;

function applyImageKitTransform(
    src: string,
    width?: number,
    height?: number,
    quality?: number,
): string {
    if (!src) return src;

    const params: string[] = [];
    if (width) params.push(`w-${width}`);
    if (height) params.push(`h-${height}`);
    params.push(`q-${quality ?? DEFAULT_QUALITY}`);
    params.push("f-webp");

    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}tr=${params.join(",")}`;
}

function getThumbnailUrl(src: string): string {
    if (!src) return src;
    const separator = src.includes("?") ? "&" : "?";
    return `${src}${separator}tr=w-20,q-${THUMB_QUALITY},f-webp`;
}

function isImageKitUrl(url: string): boolean {
    return url?.includes("ik.imagekit.io") ?? false;
}

export default function LazyImage({
    src,
    alt,
    width,
    height,
    quality,
    useTransform = true,
    className,
    loading = "lazy",
    decoding = "async",
    fetchPriority,
    style,
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    const shouldTransform = useTransform && isImageKitUrl(src);
    const transformedSrc = shouldTransform
        ? applyImageKitTransform(src, width, height, quality)
        : src;
    const placeholderSrc = shouldTransform ? getThumbnailUrl(src) : undefined;

    if (shouldTransform) {
        return (
            <div
                className={className}
                style={{
                    ...style,
                    backgroundColor: "#f0f0f0",
                    backgroundImage: placeholderSrc ? `url(${placeholderSrc})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: isLoaded ? "none" : "blur(10px)",
                    transition: "filter 0.3s ease",
                    width: width ?? "100%",
                    height: height ?? "auto",
                    ...(style ?? {}),
                }}
            >
                <IKImage
                    src={transformedSrc}
                    alt={alt}
                    loading={loading}
                    decoding={decoding}
                    fetchPriority={fetchPriority as "high" | "low" | "auto" | undefined}
                    className={className}
                    style={{
                        ...style,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 0.3s ease",
                    }}
                    onLoad={() => setIsLoaded(true)}
                    {...props}
                />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
            className={className}
            style={style}
            onLoad={() => setIsLoaded(true)}
            {...props}
        />
    );
}
