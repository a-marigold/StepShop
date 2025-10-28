'use client';

export function useResize() {
    function resize(
        element: HTMLElement,

        resizerElement: HTMLElement,

        growDirection: 'left' | 'right' = 'right'
    ) {
        let startX = 0;

        let startWidth = 0;

        function handleMouseDown(event: MouseEvent) {
            startX = event.clientX;

            startWidth = element.offsetWidth;

            event.preventDefault();

            window.addEventListener('pointermove', handleMouseMove);

            window.addEventListener('pointerup', handleMouseUp);
            window.addEventListener('pointercancel', handleMouseUp);
        }

        function handleMouseMove(event: MouseEvent) {
            const deltaClientX = event.clientX - startX;

            if (growDirection === 'right') {
                element.style.width = `${startWidth + deltaClientX}px`;
            } else {
                element.style.width = `${startWidth - deltaClientX}px`;
            }
        }

        function handleMouseUp() {
            window.removeEventListener('pointermove', handleMouseMove);
            window.removeEventListener('pointerup', handleMouseUp);
            window.removeEventListener('pointercancel', handleMouseUp);
        }

        resizerElement.addEventListener('pointerdown', handleMouseDown);

        return () => {
            resizerElement.removeEventListener('pointerdown', handleMouseDown);
        };
    }

    return resize;
}
