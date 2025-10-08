'use client';

import { useState, useEffect, useRef } from 'react';

import pickerStyles from './SizePicker.module.scss';

interface SizeOption {
    title: string | number;
    id: number;
}

interface SizePickerProps {
    sizeOptions: SizeOption[];
}

export default function SizePicker({ sizeOptions }: SizePickerProps) {
    const [currentOption, setCurrentOption] = useState<number>(
        sizeOptions[0].id
    );
    const optionsRef = useRef<
        Partial<Record<number, HTMLButtonElement | null>>
    >({});

    const activeOptionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!optionsRef.current || !activeOptionRef.current) return;

        const currentOptionRef = optionsRef.current[currentOption];

        if (!currentOptionRef) return;

        const handleChangeOption = () => {
            if (!activeOptionRef.current) return;

            activeOptionRef.current.style.transform = `translateX(${currentOptionRef.offsetLeft}px)`;
            activeOptionRef.current.style.width = `${currentOptionRef.offsetWidth}px`;
        };

        window.addEventListener('resize', handleChangeOption);
        handleChangeOption();

        return () => {
            window.removeEventListener('resize', handleChangeOption);
        };
    }, [currentOption]);

    return (
        <div
            className={pickerStyles['size-options-block']}
            aria-label='Выбрать размер товара'
        >
            {sizeOptions.map((sizeOption) => (
                <button
                    key={sizeOption.id}
                    ref={(element) => {
                        optionsRef.current[sizeOption.id] = element;
                    }}
                    className={pickerStyles['size-option']}
                    onClick={() => setCurrentOption(sizeOption.id)}
                    aria-label={`Установить размер ${sizeOption}`}
                >
                    {sizeOption.title}
                </button>
            ))}

            <div
                ref={activeOptionRef}
                className={pickerStyles['active-option']}
            />
        </div>
    );
}
