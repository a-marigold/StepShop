'use client';

import type { ReactNode, ComponentProps } from 'react';

import clsx from 'clsx';
import buttonStyles from './EmptyFilledButton.module.scss';

interface EmptyFilledButtonProps {
    title?: string;
    image?: string;

    ariaLabel: string;
    className?: string;

    isDisabled?: boolean;

    children?: ReactNode;

    clickAction?: () => void;

    props?: ComponentProps<'button'>;
}

export default function EmptyFilledButton({
    title,
    image,

    clickAction,
    className,

    isDisabled,

    children,

    ariaLabel,

    props,
}: EmptyFilledButtonProps) {
    return (
        <button
            className={clsx(buttonStyles['empty-filled-button'], className)}
            onClick={clickAction}
            aria-label={ariaLabel}
            disabled={isDisabled}
            {...props}
        >
            {image && <img src={image} alt='' />}

            {children}

            {title && <span>{title}</span>}
        </button>
    );
}
