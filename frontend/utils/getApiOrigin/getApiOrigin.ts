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
 * getApiOrigin(process.env.NEXT_PUBLIC_API_URL, 'http://localhost:3000')
 * // If there is not NEXT_PUBLIC_API_URL, it will return 'http://localhost:3000'
 * // If NEXT_PUBLIC_API_URL exists and contains 'https://server.example.com', it will return 'https://server.example.com'
 * ```
 */

export function getApiOrigin(
    envOrigin: string | undefined,
    localOrigin: string
) {
    return envOrigin ? envOrigin : localOrigin;
}
