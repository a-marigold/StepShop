import buttonStyles from './AccesButton.module.scss';

interface AccesButtonProps {
    title: string;
    clickAction?: () => void;
}

export default function AccesButton({ title, clickAction }: AccesButtonProps) {
    return (
        <button className={buttonStyles['acces-button']} onClick={clickAction}>
            {title}
        </button>
    );
}
