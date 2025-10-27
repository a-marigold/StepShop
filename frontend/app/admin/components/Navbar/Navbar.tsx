'use client';

import { useState, useRef, useLayoutEffect, useCallback } from 'react';

import { usePathname } from 'next/navigation';

import { useThrottle } from '@/hooks/useThrottle';

import { operationsList } from '../../adminOperations';
import type { OperationType } from '../../adminOperations';

import Link from 'next/link';

import clsx from 'clsx';
import navStyles from './Navbar.module.scss';

export default function Navbar() {
    const pathname = usePathname();

    function getInitialOperation(): OperationType | undefined {
        const splitPathName = pathname.split('/') as OperationType[];

        const _operations: OperationType[] = [
            'createProduct',
            'deleteProduct',
            'updateProduct',
            'createCategory',
            'deleteCategory',
        ];
        const initialOperation = _operations.find((controller) =>
            splitPathName.includes(controller)
        );

        return initialOperation;
    }

    const [activeOperation, setActiveOperation] = useState<
        OperationType | undefined
    >(getInitialOperation);

    const controllersRef = useRef<
        Partial<Record<OperationType, HTMLAnchorElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function calculateActiveBlockPosition() {
        if (!controllersRef.current || !activeOperation) return;
        const currentOperationRef = controllersRef.current[activeOperation];

        if (!activeBlockRef.current || !currentOperationRef) return;
        const operationRect = currentOperationRef.getBoundingClientRect();

        activeBlockRef.current.style.width = `${operationRect.width}px`;
        activeBlockRef.current.style.height = `${operationRect.height}px`;
        activeBlockRef.current.style.transform = `translate(${
            operationRect.left
        }px, ${operationRect.top + window.scrollY}px)`;
    }

    const trottledCalculateBlock = useThrottle(
        calculateActiveBlockPosition,
        100
    );

    useLayoutEffect(() => {
        trottledCalculateBlock();
    }, [activeOperation, trottledCalculateBlock]);

    useLayoutEffect(() => {
        window.addEventListener('resize', trottledCalculateBlock);
        window.addEventListener('scroll', trottledCalculateBlock);

        return () => {
            window.removeEventListener('resize', trottledCalculateBlock);
            window.removeEventListener('scroll', trottledCalculateBlock);
        };
    }, [trottledCalculateBlock]);

    return (
        <nav className={navStyles['navbar']}>
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
                        controllersRef.current[operation.type] = element;
                    }}
                    prefetch
                    onClick={() => setActiveOperation(operation.type)}
                >
                    {operation.title}
                </Link>
            ))}
            <div ref={activeBlockRef} className={navStyles['active-block']} />
        </nav>
    );
}
