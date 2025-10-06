'use client';

import type { ReactNode } from 'react';

import clsx from 'clsx';
import buttonStyles from './EmptyFilledButton.module.scss';

interface EmptyFilledButtonProps {
    title?: string;
    image: string;

    ariaLabel: string;
    className?: string;

    isDisabled?: boolean;

    children?: ReactNode;

    clickAction?: () => void;
}

export default function EmptyFilledButton({
    title,
    image,

    clickAction,
    className,

    isDisabled,

    children,

    ariaLabel,
}: EmptyFilledButtonProps) {
    return (
        <button
            className={clsx(buttonStyles['empty-filled-button'], className)}
            onClick={clickAction}
            aria-label={ariaLabel}
            disabled={isDisabled}
        >
            {image && <img src={image} alt='' />}

            {children}

            {title && <span>{title}</span>}
        </button>
    );
}
