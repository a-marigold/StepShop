'use client';

import { useState, useEffect, useRef } from 'react';

export function useDebounce<T>(value: T, delay: number = 600): T {
    const [debounceValue, setDebounceValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [value, delay]);

    return debounceValue;
}
