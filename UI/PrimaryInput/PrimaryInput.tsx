'use client';

import type { ChangeEvent } from 'react';

import clsx from 'clsx';
import inputStyles from './PrimaryInput.module.scss';

interface PrimaryInputProps {
    htmlId: string;

    isValid: boolean;

    title?: string;

    errorLabelTitle?: string;

    classNames?: string[];

    inputAction?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PrimaryInput({
    htmlId,

    isValid,

    title,
    errorLabelTitle,

    classNames,

    inputAction,
}: PrimaryInputProps) {
    return (
        <div
            className={clsx(
                inputStyles['primary-input-block'],
                classNames && [...classNames]
            )}
        >
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
            />

            {!isValid && errorLabelTitle && (
                <label htmlFor={htmlId} className={inputStyles['error-label']}>
                    {errorLabelTitle}
                </label>
            )}
        </div>
    );
}
