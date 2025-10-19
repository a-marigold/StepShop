import { getApiOrigin } from './getApiOrigin';

export { getApiOrigin };

export const apiOrigin = getApiOrigin(
    process.env.NEXT_PUBLIC_API_URL,
    'http://localhost:1000'
);
