'use client';

export function useResize() {
    function resize(
        element: HTMLElement,

        resizerElement: HTMLElement
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
            element.style.width = `${startWidth + (event.clientX - startX)}px`;
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
