'use client';

import { useState, useEffect, useRef } from 'react';

import type { KeyboardEvent } from 'react';

import clsx from 'clsx';
import inputStyles from './CodeInput.module.scss';

interface CodeInputProps {
    ariaLabel: string;

    className?: string;

    inputQuantity: number;
    changeAction: (...args: any) => void;
}

export default function CodeInput({
    ariaLabel,

    className,

    inputQuantity,
    changeAction,
}: CodeInputProps) {
    const [inputs, setInputs] = useState<string[]>(
        Array(inputQuantity).fill('')
    );
    const inputsRef = useRef<Partial<Record<number, HTMLInputElement | null>>>(
        {}
    );

    function handleChange(index: number, value: string) {
        if (value != ' ') {
            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[index] = value;

                return newInputs;
            });
        }
        inputsRef.current[index + 1]?.focus();
    }

    function handleClear(
        index: number,
        event: KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === 'Backspace') {
            event.preventDefault();

            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[index] = '';

                return newInputs;
            });
            inputsRef.current[index - 1]?.focus();
        }
    }

    useEffect(() => {
        changeAction(inputs.join(''));
    }, [inputs]);

    return (
        <div
            className={clsx(inputStyles['code-inputs-block'], className)}
            aria-label={ariaLabel}
        >
            {inputs.map((_, index) => (
                <input
                    key={index}
                    type='text'
                    className={inputStyles['code-input']}
                    value={inputs[index]}
                    onChange={(event) => {
                        handleChange(index, event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (!!inputs.join('')) {
                            handleClear(index, event);
                        }
                    }}
                    ref={(element) => {
                        inputsRef.current[index] = element;
                    }}
                    placeholder='•'
                    maxLength={1}
                    data-filled={!!inputs[index]}
                />
            ))}
        </div>
    );
}
