/**
 * **Returns window`s scrollbar width in pixels**
 *
 * @returns {number} Scrollbar width *in pixels*.
 * ```ts
 * getDocumentScrollbarWidth(); // 16 - Width in pixels
 * ```
 */
export function getDocumentScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
}

export function lockBodyScroll() {
    document.body.style.marginRight = `${getDocumentScrollbarWidth()}px`;
    document.body.style.overflow = 'hidden';
}

export function unlockBodyScroll() {
    document.body.style.overflow = 'auto';
    document.body.style.marginRight = `0`;
}
