import path from 'path';

export function getFileExtension(fileName: string) {
    const fileExtension = path.extname(fileName);

    if (fileExtension !== '.png' && fileExtension !== '.webp') {
        throw new Error("Only '.png' and '.webp' images supported");
    }

    return fileExtension;
}
