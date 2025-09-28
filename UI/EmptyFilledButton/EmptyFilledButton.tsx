'use client';

import clsx from 'clsx';
import buttonStyles from './EmptyFilledButton.module.scss';

interface EmptyFilledButtonProps {
    title?: string;
    imageSettings?: {
        imageUrl: string;
        imageAlt?: string;
    };

    ariaLabel: string;
    classNames?: string[];

    clickAction?: () => void;
}

export default function EmptyFilledButton({
    title,
    imageSettings,

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
            {imageSettings && (
                <img
                    src={imageSettings.imageUrl}
                    alt={imageSettings.imageAlt}
                />
            )}

            {title && <span>{title}</span>}
        </button>
    );
}
