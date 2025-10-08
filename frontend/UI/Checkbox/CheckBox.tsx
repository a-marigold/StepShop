'use client';

import type { ChangeEvent } from 'react';

import checkboxStyles from './CheckBox.module.scss';

interface CheckBoxProps {
    name: string;
    inputAction: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckBox({ name, inputAction }: CheckBoxProps) {
    return (
        <label className={checkboxStyles['checkbox-block']}>
            <input
                type='checkbox'
                id='checkbox'
                className={checkboxStyles['checkbox']}
                onChange={inputAction}
            />
            {name}
        </label>
    );
}
