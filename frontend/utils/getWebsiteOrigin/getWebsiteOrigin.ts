/**
 * If `envOrigin` is not undefined, it returns `envOrigin`. Else it returns `localOrigin`.
 *
 * @param {string  | undefined} envOrigin - API url from .env variable
 * @param {string} localOrigin - just string of local api url
 *
 * @returns {string} API origin
 *
 * @example
 * ```javascript
 * getWebsiteOrigin(process.env.NEXT_PUBLIC_WEBSITE_URL, 'http://localhost:3000')
 * // If there is not NEXT_PUBLIC_WEBSITE_URL, it will return 'http://localhost:3000'
 * // If NEXT_PUBLIC_WEBSITE_URL exists and contains for example 'https://website.example.com', it will return 'https://website.example.com'
 * ```
 */

export function getWebsiteOrigin(
    envOrigin: string | undefined,
    localOrigin: string
) {
    return envOrigin ?? localOrigin;
}
