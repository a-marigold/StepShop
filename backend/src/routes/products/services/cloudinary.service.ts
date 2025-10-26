import cloudinary from 'src/plugins/cloudinary';

import type { UploadApiResponse } from 'cloudinary';
import type { MultipartFile } from '@fastify/multipart';

export async function uploadImage(
    file: MultipartFile
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'step-shop/products',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        file.file.pipe(stream);
    });
}
