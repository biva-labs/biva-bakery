import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import dotenv from "dotenv";
import { fileTypeFromBuffer } from "file-type";
import streamifier from "streamifier";

dotenv.config();

export type UploadFileResult = {
    secure_url?: string;      // https URL for delivery (if available)
    url?: string;             // fallback url
    public_id: string;
    resource_type: string;    // 'image' | 'video' | 'raw' | etc.
    bytes?: number;
    mime_type?: string | null;
    original_filename?: string | null;
    raw?: UploadApiResponse;
};

export type UploadOptions = {
    folder?: string;
    public_id?: string;
    tags?: string | string[];
    context?: Record<string, string>;
    maxSizeBytes?: number;
    // If you want a strict whitelist, provide MIME types here (optional)
    allowedMimeTypes?: string[];
    // Force resource type (rarely needed). If not provided we use 'auto'.
    forceResourceType?: "auto" | "image" | "video" | "raw";
};

export class CloudinaryService {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
            api_key: process.env.CLOUDINARY_API_KEY!,
            api_secret: process.env.CLOUDINARY_API_SECRET!,
            secure: true
        });
    }

    async listImages(folderPrefix = '', dynamicMode = false): Promise<any[]> {
        let resources: any[] = [];
        let nextCursor: string | undefined = undefined;

        if (dynamicMode) {
            do {
                const response: any = await cloudinary.api.resources_by_asset_folder(
                    folderPrefix,
                    {
                        max_results: 500,
                        next_cursor: nextCursor
                    }
                );
                resources.push(...(response.resources) || []);
                nextCursor = response.next_cursor
            } while (nextCursor);
        }

        return resources;
    }

    async listImagesByTags(tags: string[]): Promise<any[]> {
        try {
            const tagsExpression = tags.map(tag => `${tag}`).join(' OR ');
            const expression = `tags=(${tagsExpression})`;

            const result = await cloudinary.search
                .expression(expression)
                .with_field("tags")
                .with_field("context")
                .max_results(500)
                .execute();

            return result.resources;
        } catch (error) {
            console.error('Error fetching images by tags:', error);
            return [];
        }
    }

    generateUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }): string {
        return cloudinary.url(publicId, options);
    }

    async uploadImage(
        source: File | Buffer | ArrayBuffer | Uint8Array | string,
        options: UploadOptions = {}
    ) {
        const {
            folder,
            public_id,
            allowedMimeTypes,
            context,
            forceResourceType,
            maxSizeBytes,
            tags
        } = options;

        const toBuffer = async (src: typeof source): Promise<{ buffer?: Buffer; detectedMime?: string | null; originalName?: string | null }> => {
            if (typeof src === "string") {
                // string will be handled separately (remote URL or data URL)
                return { buffer: undefined };
            }

            if (Buffer.isBuffer(src)) {
                const detected = await fileTypeFromBuffer(src);
                return { buffer: src, detectedMime: detected?.mime ?? null };
            }

            // web File-like (Bun/Hono File has arrayBuffer())
            if (typeof (src as any)?.arrayBuffer === "function") {
                const arr = await (src as any).arrayBuffer();
                const buf = Buffer.from(arr);
                const detected = await fileTypeFromBuffer(buf);
                const name = (src as any)?.name ?? null;
                return { buffer: buf, detectedMime: detected?.mime ?? null, originalName: name };
            }

            if (src instanceof ArrayBuffer) {
                const buf = Buffer.from(new Uint8Array(src));
                const detected = await fileTypeFromBuffer(buf);
                return { buffer: buf, detectedMime: detected?.mime ?? null };
            }
            if (src instanceof Uint8Array) {
                const buf = Buffer.from(src);
                const detected = await fileTypeFromBuffer(buf);
                return { buffer: buf, detectedMime: detected?.mime ?? null };
            }

            return { buffer: undefined };
        }

        const resource_type = forceResourceType ?? "auto";

        const uploadOpts: Record<string, any> = {
            resource_type,
            folder,
        };
        if (public_id) uploadOpts.public_id = public_id;
        if (tags) uploadOpts.tags = tags;
        if (context) uploadOpts.context = context;

        // convert to buffer if possible
        const { buffer, detectedMime, originalName } = await toBuffer(source);

        // size check (if buffer available)
        if (typeof maxSizeBytes === "number" && buffer && buffer.length > maxSizeBytes) {
            throw new Error(`File too large: ${buffer.length} bytes (max ${maxSizeBytes})`);
        }

        // mime whitelist check (if detected)
        if (allowedMimeTypes && detectedMime && !allowedMimeTypes.includes(detectedMime)) {
            throw new Error(`MIME type not allowed: ${detectedMime}`);
        }


        let result: UploadApiResponse;

        try {
            if (buffer) {

                result = await new Promise((resolve, reject) => {
                    const uploader = cloudinary.uploader.upload_stream(uploadOpts, (err, res) => {
                        if (err) return reject(err);
                        resolve(res as UploadApiResponse);
                    });
                    streamifier.createReadStream(buffer).pipe(uploader);
                });
            } else {
                throw new Error("Unsupported source type: cannot convert to buffer or upload a string URL");
            }
        } catch (err: any) {

            const message = err?.message ?? String(err);
            throw new Error(`Cloudinary upload failed: ${message}`);
        }


        const out: UploadFileResult = {
            secure_url: result.secure_url,
            url: result.url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            bytes: result.bytes,
            // prefer detected mime from buffer if available, else try Cloudinary's format
            mime_type: detectedMime ?? (result.format ? `${result.format}` : null),
            original_filename: result.original_filename ?? originalName ?? null,
            raw: result,
        };

        return out;
    };

}
