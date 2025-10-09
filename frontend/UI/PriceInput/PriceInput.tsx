'use client';

import type { ChangeEvent } from 'react';
import type { CurrencySymbol } from '@shared/types/ProductTypes';

import inputStyles from './PriceInput.module.scss';

interface PriceInputProps {
    currencySymbol: CurrencySymbol;

    defaultValue: number;

    minValue?: number;
    maxValue?: number;

    inputAction?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PriceInput({
    currencySymbol,

    defaultValue = 0,
    minValue = 0,
    maxValue = 6000,

    inputAction,
}: PriceInputProps) {
    return (
        <div className={inputStyles['price-input-block']}>
            <input
                type='number'
                className={inputStyles['price-input']}
                aria-label='Input price'
                defaultValue={defaultValue}
                min={minValue}
                max={maxValue}
                onChange={inputAction}
            />

            <span className={inputStyles['currency-symbol']}>
                {currencySymbol}
            </span>
        </div>
    );
}
