import { getWebsiteOrigin } from './getWebsiteOrigin';

export { getWebsiteOrigin };

export const websiteOrigin = getWebsiteOrigin(
    process.env.NEXT_PUBLIC_WEBSITE_URL || process.env.WEBSITE_URL,
    'http://localhost:3000'
);
