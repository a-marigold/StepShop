'use client';

import type { ChangeEvent } from 'react';

import clsx from 'clsx';
import inputStyles from './PrimaryInput.module.scss';

interface PrimaryInputProps {
    htmlId: string;

    isValid: boolean;

    title?: string;
    errorLabelTitle?: string;

    placeholder?: string;

    className?: string;

    inputAction?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PrimaryInput({
    htmlId,

    isValid,

    title,
    errorLabelTitle,

    placeholder,

    className,

    inputAction,
}: PrimaryInputProps) {
    return (
        <div className={clsx(inputStyles['primary-input-block'], className)}>
            {title && (
                <label htmlFor={htmlId} className={inputStyles['title-label']}>
                    {title}
                </label>
            )}

            <input
                id={htmlId}
                type='text'
                className={inputStyles['primary-input']}
                onChange={inputAction}
                aria-invalid={!isValid}
                placeholder={placeholder}
            />

            {!isValid && errorLabelTitle && (
                <label htmlFor={htmlId} className={inputStyles['error-label']}>
                    {errorLabelTitle}
                </label>
            )}
        </div>
    );
}
