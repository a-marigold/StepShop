export function getApiOrigin(
    envOrigin: string | undefined,
    localOrigin: string
) {
    return envOrigin ?? localOrigin;
}

export const apiOrigin = getApiOrigin(
    process.env.API_URL,
    'http://localhost:3000'
);
