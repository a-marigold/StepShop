import path from 'path';

export function getPublicDirPath() {
    return path.join(process.cwd(), 'public');
}

export const publicDirPath = getPublicDirPath();
