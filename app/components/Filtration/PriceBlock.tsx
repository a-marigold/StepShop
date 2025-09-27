'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './redux';

import PriceInput from '@UI/PriceInput';

import filterStyles from './Filtration.module.scss';
import { setMinPrice, setMaxPrice } from './redux/filtrationSlice';

export default function PriceBlock() {
    const minPrice = useSelector(
        (state: RootState) => state.filtration.minPrice
    );
    const maxPrice = useSelector(
        (state: RootState) => state.filtration.maxPrice
    );
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
                    value={minPrice}
                    inputAction={(e) => {
                        dispatch(setMinPrice(Number(e.target.value)));
                    }}
                />
                <PriceInput
                    currencySymbol='₸'
                    defaultValue={3200}
                    value={maxPrice}
                    maxValue={6000}
                    inputAction={(e) =>
                        dispatch(setMaxPrice(Number(e.target.value)))
                    }
                />
            </div>
        </div>
    );
}
