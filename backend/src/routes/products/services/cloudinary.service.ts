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

        file.file.on('error', (error) => {
            reject(error);
        });

        file.file.pipe(stream);
    });
}

export async function destroyImage(imageId: string) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(
            imageId,
            { invalidate: true },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
    });
}

export async function updateImage(
    imageId: string,
    file: MultipartFile
): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'step-shop/products',

                overwrite: true,
                invalidate: true,
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        file.file.on('error', (error) => {
            reject(error);
        });

        file.file.pipe(stream);
    });
}
