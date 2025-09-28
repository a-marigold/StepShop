'use client';

import { useRouter } from 'next/navigation';

import type { RootState } from './redux';
import { useSelector } from 'react-redux';

import CheckBoxesBlock from './CheckBoxesBlock';
import PriceBlock from './PriceBlock';
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
                <CheckBoxesBlock propertiesList={['option 1', 'option 2']} />

                <PriceBlock />
            </div>

            <AccessButton
                title='Применить'
                ariaLabel='Применить фильтры'
                classNames={[filterStyles['access-button']]}
                clickAction={AccessFilters}
            />
        </aside>
    );
}
