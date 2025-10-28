'use client';

import { useEffect, useRef } from 'react';

import { useResize } from '@/hooks';

import asideStyles from './Aside.module.scss';

export default function Aside() {
    const asideRef = useRef<HTMLElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    const resizer = useResize();

    useEffect(() => {
        if (asideRef.current && resizerRef.current) {
            return resizer(asideRef.current, resizerRef.current, 'left');
        }
    }, []);

    return (
        <aside ref={asideRef} className={asideStyles['aside']}>
            <div ref={resizerRef} className={asideStyles['resizer']} />

            <p className={asideStyles['title']}>Товары</p>
        </aside>
    );
}
