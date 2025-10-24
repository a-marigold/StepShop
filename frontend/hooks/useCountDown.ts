'use client';

import { useEffect } from 'react';

export function useCountDown<T extends Function>(
    count: number,
    countDispatch: T
): number {
    useEffect(() => {
        const countDown = setInterval(() => {
            countDispatch();
        }, 1000);

        if (count < 1) {
            clearInterval(countDown);
        }

        return () => {
            clearInterval(countDown);
        };
    }, [count]);

    return count;
}
