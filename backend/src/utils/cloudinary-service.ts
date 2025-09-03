import { v2 as cloudinary, type ResourceApiResponse } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

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
    
    async listImagesByTag(tag: string): Promise<any[]> {
      try {
        const result = await cloudinary.search.expression(`tags=${tag}`).max_results(500).execute();
        
        return result.resources;
      }
      catch(error) {
        console.error('Error fetching images by tag:', error);
        return [];
      }
    }

    generateUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }): string {
        return cloudinary.url(publicId, options);
    }
}
