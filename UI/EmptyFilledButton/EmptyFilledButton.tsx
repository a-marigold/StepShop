'use client';

import clsx from 'clsx';
import buttonStyles from './EmptyFilledButton.module.scss';

interface EmptyFilledButtonProps {
    title?: string;
    image: string;

    ariaLabel: string;
    className?: string;

    isDisabled?: boolean;

    clickAction?: <T>(args?: T) => void;
}

export default function EmptyFilledButton({
    title,
    image,

    clickAction,
    className,

    isDisabled,

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

            {title && <span>{title}</span>}
        </button>
    );
}
