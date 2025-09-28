'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from './redux';

import PriceInput from '@UI/PriceInput';

import filterStyles from './Filtration.module.scss';
import { setMinPrice, setMaxPrice } from './redux/filtrationSlice';

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
                    currencySymbol='₸'
                    defaultValue={0}
                    maxValue={16000}
                    inputAction={(e) => {
                        dispatch(setMinPrice(Number(e.target.value)));
                    }}
                />
                <PriceInput
                    currencySymbol='₸'
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
