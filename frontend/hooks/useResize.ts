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

            window.addEventListener('mousemove', handleMouseMove);

            window.addEventListener('mouseup', handleMouseUp);
        }

        function handleMouseMove(event: MouseEvent) {
            element.style.width = `${startWidth + (event.clientX - startX)}px`;
        }

        function handleMouseUp() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        resizerElement.addEventListener('mousedown', handleMouseDown);

        return () => {
            resizerElement.removeEventListener('mousedown', handleMouseDown);
        };
    }

    return resize;
}
