import clsx from 'clsx';
import spinnerStyles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
    sizePX: number;
    color: string;

    className: string;
}

export default function LoadingSpinner({
    sizePX,
    color,
    className,
}: LoadingSpinnerProps) {
    return (
        <div
            className={clsx(spinnerStyles['loading-spinner'], className)}
            style={{
                width: `${sizePX}px`,
                height: `${sizePX}px`,
                borderColor: color,
            }}
        />
    );
}
