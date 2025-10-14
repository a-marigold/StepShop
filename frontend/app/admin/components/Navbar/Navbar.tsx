'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import clsx from 'clsx';
import navStyles from './Navbar.module.scss';

const controllersList = [
    { title: 'Добавить товар', path: '/admin/create' },
    { title: 'Удалить товар', path: '/admin/delete' },
    { title: 'Обновить товар', path: '/admin/update' },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={navStyles['navbar']}>
            {controllersList.map((controller, index) => (
                <Link
                    key={index}
                    href={controller.path}
                    className={clsx(
                        navStyles['controller'],
                        controller.title === pathname &&
                            navStyles['active-controller']
                    )}
                >
                    {controller.title}
                </Link>
            ))}
        </nav>
    );
}
