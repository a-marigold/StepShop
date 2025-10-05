'use client';

import type { ReactNode } from 'react';

import widgetStyles from './CheckoutWidget.module.scss';
import clsx from 'clsx';

interface CheckoutWidgetProps {
    title: string;
    subTitle?: string;

    className?: string;

    children: ReactNode;
}

export default function CheckoutWidget({
    title,
    subTitle,

    className,

    children,
}: CheckoutWidgetProps) {
    return (
        <article className={clsx(widgetStyles['checkout-widget'], className)}>
            <div className={widgetStyles['title-block']}>
                <h2 className={widgetStyles['title']}>{title}</h2>
                {subTitle && (
                    <p className={widgetStyles['subtitle']}>{subTitle}</p>
                )}
            </div>

            {children}
        </article>
    );
}
