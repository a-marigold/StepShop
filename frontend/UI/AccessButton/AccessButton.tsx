import type { ReactNode } from 'react';

import clsx from 'clsx';
import buttonStyles from './AccessButton.module.scss';

interface AccessButtonProps {
    image?: string;
    title?: string;

    ariaLabel: string;

    className?: string;
    buttonType?: 'button' | 'submit';

    clickAction?: () => void;

    children?: ReactNode;
}
export default function AccessButton({
    image,
    title,

    ariaLabel,
    className,
    buttonType = 'submit',

    clickAction,

    children,
}: AccessButtonProps) {
    return (
        <button
            className={clsx(buttonStyles['access-button'], className)}
            onClick={clickAction}
            aria-label={ariaLabel}
            type={buttonType}
        >
            {image && <img src={image} alt='' />}
            {title && <span>{title}</span>}

            {children}
        </button>
    );
}
