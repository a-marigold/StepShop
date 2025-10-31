'use client';

import { useState, useEffect, useRef } from 'react';

import { useResize } from '@/hooks';

import StreamWrapper from './components/StreamWrapper';

import asideStyles from './Aside.module.scss';

export default function Aside() {
    const asideRef = useRef<HTMLElement>(null);

    const resizerRef = useRef<HTMLDivElement>(null);

    const [resizeEnabled, setResizeEnabled] = useState(true);

    const resizer = useResize();
    useEffect(() => {
        const widthQuery = window.matchMedia('(max-width: 600px)');

        if (widthQuery.matches) {
            setResizeEnabled(false);
        }

        widthQuery.addEventListener('change', () => {
            setResizeEnabled((prev) => !prev);
            if (asideRef.current && !resizeEnabled) {
                asideRef.current.style.width = '';
            }
        });

        if (asideRef.current && resizerRef.current) {
            return resizer(
                asideRef.current,
                resizerRef.current,
                'left',
                resizeEnabled
            );
        }
    }, [resizeEnabled]);

    return (
        <aside ref={asideRef} className={asideStyles['aside']}>
            <div ref={resizerRef} className={asideStyles['resizer']} />

            <StreamWrapper />
        </aside>
    );
}
