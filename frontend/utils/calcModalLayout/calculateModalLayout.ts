/**
 * This function sets the `modalRef` width to the same width of Any html element.
 *
 * And sets Modal position relative to `elementRef`.
 *
 * @param {HTMLElement | null } elementRef -  DOM link on any html element that relative to modalRef
 * @param {HTMLDivElement | null} modalRef - DOM link on modal html element
 */

export function calculateModalLayout(
    elementRef: HTMLElement | null,
    modalRef: HTMLDivElement | null
) {
    if (!elementRef || !modalRef) return;

    const elementLayout = elementRef.getBoundingClientRect();

    modalRef.style.width = `${elementLayout.width}px`;

    modalRef.style.transform = `translate(${elementLayout.left}px, ${
        elementLayout.top + elementLayout.height
    }px)`;
}
