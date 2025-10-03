import type { ReactNode } from 'react';

import clsx from 'clsx';
import buttonStyles from './AccessButton.module.scss';

interface AccessButtonProps {
    image?: string;

    title?: string;

    ariaLabel: string;
    classNames?: string[];

    clickAction?: () => void;

    children?: ReactNode;
}
export default function AccessButton({
    image,

    title,

    clickAction,

    classNames,

    ariaLabel,

    children,
}: AccessButtonProps) {
    return (
        <button
            className={clsx(
                buttonStyles['access-button'],
                classNames && [...classNames]
            )}
            onClick={clickAction}
            aria-label={ariaLabel}
        >
            {image && <img src={image} alt='' />}
            {title && <span>{title}</span>}

            {children}
        </button>
    );
}
