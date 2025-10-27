'use client';

import { useEffect } from 'react';

function resize(
    event: MouseEvent,

    elementRef: HTMLElement
) {
    elementRef.style.width = `${event.clientX - elementRef.offsetLeft}px`;
}

export function useResize(
    elementRef: HTMLElement | null,
    resizerElementRef: HTMLElement | null
) {
    useEffect(() => {
        if (!elementRef || !resizerElementRef) return;

        function handleResize(event: MouseEvent) {
            if (!elementRef) return;

            resize(event, elementRef);
        }

        function handleMouseDown() {
            if (!resizerElementRef) return;

            resizerElementRef.addEventListener('mousemove', handleResize);
            resizerElementRef.addEventListener('mouseup', handleMouseUp);
        }

        function handleMouseUp() {
            if (!resizerElementRef) return;

            resizerElementRef.removeEventListener('mousedown', handleMouseDown);
            resizerElementRef.removeEventListener('mousemove', handleResize);
            resizerElementRef.removeEventListener('mouseup', handleMouseUp);
        }

        resizerElementRef.addEventListener('mousedown', handleMouseDown);

        resizerElementRef.addEventListener('mouseup', handleMouseUp);

        return () => {
            handleMouseUp();
        };
    }, []);
}
