'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

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
        title: 'Добавить товар',
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

    const [activeController, setActiveController] =
        useState<Controller>(pathname);

    const controllersRef = useRef<
        Partial<Record<Controller, HTMLAnchorElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function calculateActiveBlockPosition() {
        if (!controllersRef.current) return;
        const currentControllerRef = controllersRef.current[activeController];

        if (!activeBlockRef.current || !currentControllerRef) return;
        const controllerRect = currentControllerRef.getBoundingClientRect();

        activeBlockRef.current.style.width = `${controllerRect.width}px`;
        activeBlockRef.current.style.height = `${controllerRect.height}px`;
        activeBlockRef.current.style.transform = `translate(${
            controllerRect.left
        }px, ${controllerRect.top + window.scrollY}px)`;
    }

    useEffect(() => {
        calculateActiveBlockPosition();

        window.addEventListener('resize', calculateActiveBlockPosition);

        return () => {
            window.removeEventListener('resize', calculateActiveBlockPosition);
        };
    }, [activeController]);

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
