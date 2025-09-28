import clsx from 'clsx';
import buttonStyles from './AccessButton.module.scss';

interface AccessButtonProps {
    title: string;

    ariaLabel: string;
    classNames?: string[];

    clickAction?: () => void;
}

export default function AccessButton({
    title,

    clickAction,

    classNames,

    ariaLabel,
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
            {title}
        </button>
    );
}
