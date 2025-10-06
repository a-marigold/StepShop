'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { setMinPrice, setMaxPrice } from './redux/filtrationSlice';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import PriceInput from '@UI/PriceInput';

import filterStyles from './Filtration.module.scss';

export default function PriceBlock() {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className={`${filterStyles['filter-block']} ${filterStyles['price-block']}`}
        >
            <h3 className={filterStyles['filter-block-title']}>
                Цена от и до:
            </h3>

            <div className={filterStyles['price-inputs-group']}>
                <PriceInput
                    currencySymbol={CURRENCY_SYMBOL}
                    defaultValue={0}
                    maxValue={16000}
                    inputAction={(e) => {
                        dispatch(setMinPrice(Number(e.target.value)));
                    }}
                />
                <PriceInput
                    currencySymbol={CURRENCY_SYMBOL}
                    defaultValue={16000}
                    maxValue={16000}
                    inputAction={(event) =>
                        dispatch(setMaxPrice(Number(event.target.value)))
                    }
                />
            </div>
        </div>
    );
}
