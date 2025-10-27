'use client';

import { useState } from 'react';
import type { ChangeEvent } from 'react';

import clsx from 'clsx';
import inputStyles from './FileInput.module.scss';

interface PrimaryInputProps {
    htmlId: string;

    isValid: boolean;

    title?: string;
    errorLabelTitle?: string;

    className?: string;

    inputAction?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({
    htmlId,

    isValid,

    title,

    errorLabelTitle,

    className,

    inputAction,
}: PrimaryInputProps) {
    const [fileName, setFileName] = useState<string>();

    return (
        <div className={clsx(inputStyles['file-input-block'], className)}>
            <label htmlFor={htmlId} className={inputStyles['title-label']}>
                {title}
            </label>

            <input
                id={htmlId}
                type='file'
                className={inputStyles['file-input']}
                aria-labelledby={`${htmlId}-label`}
                aria-invalid={!isValid}
                onChange={(event) => {
                    if (inputAction) inputAction(event);
                    setFileName(event.target.files?.[0].name);
                }}
            />

            <label
                id={`${htmlId}-label`}
                htmlFor={htmlId}
                className={inputStyles['file-input-label']}
                data-valid={isValid}
                data-filled={!!fileName}
                tabIndex={0}
            >
                {fileName}
            </label>

            {errorLabelTitle && !isValid && (
                <label htmlFor={htmlId} className={inputStyles['error-label']}>
                    {errorLabelTitle}
                </label>
            )}
        </div>
    );
}
