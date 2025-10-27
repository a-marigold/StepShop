import clsx from 'clsx';
import spinnerStyles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
    size?: string;

    borderWidth?: string;

    color?: string;

    className?: string;
}

export default function LoadingSpinner({
    size,
    borderWidth,

    color,
    className,
}: LoadingSpinnerProps) {
    return (
        <div
            className={clsx(spinnerStyles['loading-spinner'], className)}
            style={{
                width: size,
                height: size,
                borderColor: color,
                borderWidth,
            }}
        />
    );
}
