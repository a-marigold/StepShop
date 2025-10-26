'use client';

import { useRef, useCallback } from 'react';

export function useThrottle(
    callback: (...args: any[]) => void,
    delay: number = 200
) {
    const lastCallRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    return useCallback(
        (...args: any[]) => {
            const now = Date.now();
            const remaining = delay - (now - lastCallRef.current);

            if (remaining <= 0) {
                lastCallRef.current = now;

                callback(...args);
            } else if (!timeoutRef.current) {
                timeoutRef.current = setTimeout(() => {
                    lastCallRef.current = Date.now();

                    timeoutRef.current = null;

                    callback(...args);
                }, remaining);
            }
        },
        [callback, delay]
    );
}
