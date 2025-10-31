'use client';

import { useRouter } from 'next/navigation';

import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

import ProductOptions from './components/ProductOptions';
import PriceBlock from './components/PriceBlock';
import AccessButton from '@/UI/AccessButton';

import filterStyles from './Filtration.module.scss';

export default function Filtration() {
    const minPrice = useSelector(
        (state: RootState) => state.filtration.minPrice
    );

    const maxPrice = useSelector(
        (state: RootState) => state.filtration.maxPrice
    );

    const options = useSelector((state: RootState) => state.filtration.options);

    const router = useRouter();

    function AccessFilters() {
        router.replace(
            `/?minPrice=${minPrice}&maxPrice=${maxPrice}&options=${options}`,
            { scroll: false }
        );
    }

    return (
        <aside className={filterStyles['filtration-box']}>
            <h2 className={filterStyles['title']}>Фильтрация</h2>

            <div className={filterStyles['filters-list']}>
                <ProductOptions />

                <PriceBlock />
            </div>

            <AccessButton
                title='Применить'
                ariaLabel='Применить фильтры'
                className={filterStyles['access-button']}
                clickAction={AccessFilters}
            />
        </aside>
    );
}
