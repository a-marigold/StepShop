'use client';

import type { ReactNode } from 'react';

import widgetStyles from './CheckoutWidget.module.scss';
import clsx from 'clsx';

interface CheckoutWidgetProps {
    title: string;

    className?: string;

    children: ReactNode;
}

export default function CheckoutWidget({
    title,

    className,

    children,
}: CheckoutWidgetProps) {
    return (
        <article className={clsx(widgetStyles['checkout-widget'], className)}>
            <div className={widgetStyles['title-block']}>
                <h2 className={widgetStyles['title']}>{title}</h2>
            </div>

            {children}
        </article>
    );
}
