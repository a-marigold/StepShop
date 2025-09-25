import buttonStyles from './AccesButton.module.scss';

interface AccesButtonProps {
    title: string;
    ariaLabel: string;
    clickAction?: () => void;
}

export default function AccesButton({
    title,
    clickAction,
    ariaLabel,
}: AccesButtonProps) {
    return (
        <button
            className={buttonStyles['acces-button']}
            onClick={clickAction}
            aria-label={ariaLabel}
        >
            {title}
        </button>
    );
}
