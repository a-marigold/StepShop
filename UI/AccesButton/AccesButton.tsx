import clsx from 'clsx';
import buttonStyles from './AccesButton.module.scss';

interface AccesButtonProps {
    title: string;

    ariaLabel: string;
    classNames?: string[];

    clickAction?: () => void;
}

export default function AccesButton({
    title,

    clickAction,
    classNames,

    ariaLabel,
}: AccesButtonProps) {
    return (
        <button
            className={clsx(
                buttonStyles['acces-button'],
                classNames && [...classNames]
            )}
            onClick={clickAction}
            aria-label={ariaLabel}
        >
            {title}
        </button>
    );
}
