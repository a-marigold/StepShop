'use client';

import { useState, useRef, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { useThrottle, useResize } from '@/hooks';

import { operationsList } from '../../adminOperations';
import type { OperationPath, OperationType } from '../../adminOperations';

import Link from 'next/link';

import clsx from 'clsx';
import navStyles from './Navbar.module.scss';

export default function Navbar() {
    const pathname = usePathname() as OperationPath;

    // function getInitialOperation(): OperationPath | undefined {
    //     const splitPathName = pathname.split('/') as OperationType[];

    //     const _operations: OperationPath[] = [
    //         '/admin/products/create',
    //         '/admin/products/delete',
    //         '/admin/products/update',
    //         '/admin/categories/create',
    //         '/admin/categories/delete',
    //     ];

    //     const initialOperation = _operations.find((operations) =>
    //         splitPathName.includes(operations)
    //     );

    //     return initialOperation;
    // }

    const [activeOperation, setActiveOperation] = useState<
        OperationPath | undefined
    >(pathname);

    const controllersRef = useRef<
        Partial<Record<OperationPath, HTMLAnchorElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function calculateActiveBlockPosition() {
        if (!controllersRef.current || !activeOperation) return;
        const currentOperationRef = controllersRef.current[activeOperation];

        if (
            !activeBlockRef.current ||
            !currentOperationRef ||
            !navbarRef.current
        )
            return;
        const operationRect = currentOperationRef.getBoundingClientRect();
        const navbarRect = navbarRef.current.getBoundingClientRect();

        activeBlockRef.current.style.height = `${operationRect.height}px`;
        activeBlockRef.current.style.transform = `translate(${
            operationRect.left - navbarRect.left
        }px, ${operationRect.top - navbarRect.top}px)`;
    }

    const trottledCalculateBlock = useThrottle(
        calculateActiveBlockPosition,
        100
    );

    useEffect(() => {
        trottledCalculateBlock();
    }, [activeOperation, trottledCalculateBlock]);

    const navbarResizeObserver = new ResizeObserver(trottledCalculateBlock);

    useEffect(() => {
        window.addEventListener('resize', trottledCalculateBlock);
        window.addEventListener('scroll', trottledCalculateBlock);

        if (navbarRef.current) {
            navbarResizeObserver.observe(navbarRef.current);
        }

        return () => {
            window.removeEventListener('resize', trottledCalculateBlock);
            window.removeEventListener('scroll', trottledCalculateBlock);
            navbarResizeObserver.disconnect();
        };
    }, [trottledCalculateBlock]);

    const [resizeEnabled, setResizeEnabled] = useState(true);

    const navbarRef = useRef<HTMLElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);

    const resize = useResize();
    useEffect(() => {
        const widthQuery = window.matchMedia('(max-width: 600px)');

        if (widthQuery.matches) {
            setResizeEnabled(false);
        }

        widthQuery.addEventListener('change', () => {
            setResizeEnabled((prev) => !prev);

            if (navbarRef.current && !resizeEnabled) {
                navbarRef.current.style.width = '';
            }
        });

        if (navbarRef.current && resizerRef.current) {
            return resize(
                navbarRef.current,
                resizerRef.current,
                'right',
                resizeEnabled
            );
        }
    }, [resizeEnabled]);

    return (
        <nav ref={navbarRef} className={navStyles['navbar']}>
            {operationsList.map((operation, index) => (
                <Link
                    key={index}
                    href={operation.path}
                    className={clsx(
                        navStyles['operation'],
                        operation.path === pathname &&
                            navStyles['active-operation']
                    )}
                    ref={(element) => {
                        controllersRef.current[operation.path] = element;
                    }}
                    prefetch
                    onClick={() => setActiveOperation(operation.path)}
                >
                    {operation.title}
                </Link>
            ))}

            <div ref={activeBlockRef} className={navStyles['active-block']} />

            <div ref={resizerRef} className={navStyles['resizer']} />
        </nav>
    );
}
