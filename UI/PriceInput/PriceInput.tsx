import type { CurrencySymbol } from '@/types/ProductTypes';

import inputStyles from './PriceInput.module.scss';

interface PriceInputProps {
    currencySymbol: CurrencySymbol;
    defaultValue: number;
}

export default function PriceInput({
    currencySymbol,
    defaultValue = 0,
}: PriceInputProps) {
    return (
        <div className={inputStyles['price-input-block']}>
            <input
                type='number'
                className={inputStyles['price-input']}
                aria-label='Input price'
                defaultValue={defaultValue}
                min={0}
                max={3200}
            />

            <span className={inputStyles['currency-symbol']}>
                {currencySymbol}
            </span>
        </div>
    );
}
