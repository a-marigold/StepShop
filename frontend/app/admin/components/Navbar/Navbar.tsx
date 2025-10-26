'use client';

import { useState, useRef, useLayoutEffect, useCallback } from 'react';

import { usePathname } from 'next/navigation';

import { useThrottle } from '@/hooks/useThrottle';

import Link from 'next/link';

import clsx from 'clsx';
import navStyles from './Navbar.module.scss';

type Controller = 'create' | 'delete' | 'update';

const controllersList: {
    title: string;

    path: string;

    type: Controller;
}[] = [
    {
        title: 'Создать товар',
        path: '/admin/create',
        type: 'create',
    },

    { title: 'Удалить товар', path: '/admin/delete', type: 'delete' },

    {
        title: 'Обновить товар',
        path: '/admin/update',
        type: 'update',
    },
];

export default function Navbar() {
    const pathname = usePathname();

    function getInitialController(): Controller | undefined {
        const splitPathName = pathname.split('/') as Controller[];

        const _controllers: Controller[] = ['create', 'delete', 'update'];
        const initialController = _controllers.find((controller) =>
            splitPathName.includes(controller)
        );

        return initialController;
    }

    const [activeController, setActiveController] = useState<
        Controller | undefined
    >(getInitialController);

    const controllersRef = useRef<
        Partial<Record<Controller, HTMLAnchorElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function calculateActiveBlockPosition() {
        if (!controllersRef.current || !activeController) return;
        const currentControllerRef = controllersRef.current[activeController];

        if (!activeBlockRef.current || !currentControllerRef) return;
        const controllerRect = currentControllerRef.getBoundingClientRect();

        activeBlockRef.current.style.width = `${controllerRect.width}px`;
        activeBlockRef.current.style.height = `${controllerRect.height}px`;
        activeBlockRef.current.style.transform = `translate(${
            controllerRect.left
        }px, ${controllerRect.top + window.scrollY}px)`;
    }

    const trottledCalculateBlock = useThrottle(
        calculateActiveBlockPosition,
        100
    );

    useLayoutEffect(() => {
        trottledCalculateBlock();
    }, [activeController, trottledCalculateBlock]);

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
            {controllersList.map((controller, index) => (
                <Link
                    key={index}
                    href={controller.path}
                    className={clsx(
                        navStyles['controller'],
                        controller.path === pathname &&
                            navStyles['active-controller']
                    )}
                    ref={(element) => {
                        controllersRef.current[controller.type] = element;
                    }}
                    prefetch
                    onClick={() => setActiveController(controller.type)}
                >
                    {controller.title}
                </Link>
            ))}
            <div ref={activeBlockRef} className={navStyles['active-block']} />
        </nav>
    );
}
