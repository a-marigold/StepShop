'use client';

import clsx from 'clsx';
import buttonStyles from './EmptyFilledButton.module.scss';

interface EmptyFilledButtonProps {
    title?: string;
    image: string;

    ariaLabel: string;
    classNames?: string[];

    clickAction?: () => void;
}

export default function EmptyFilledButton({
    title,
    image,

    clickAction,
    classNames,

    ariaLabel,
}: EmptyFilledButtonProps) {
    return (
        <button
            className={clsx(
                buttonStyles['empty-filled-button'],
                classNames && [...classNames]
            )}
            onClick={clickAction}
            aria-label={ariaLabel}
        >
            {image && <img src={image} alt='' />}

            {title && <span>{title}</span>}
        </button>
    );
}
