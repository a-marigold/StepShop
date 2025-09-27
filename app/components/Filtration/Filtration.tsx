'use client';

import { useRouter } from 'next/navigation';

import { Provider } from 'react-redux';
import { filtrationStore } from './redux';

import CheckBoxesBlock from './CheckBoxesBlock';
import PriceBlock from './PriceBlock';
import AccessButton from '@/UI/AccessButton';

import filterStyles from './Filtration.module.scss';

export default function Filtration() {
    const router = useRouter();

    function AccessFilters() {
        // router.relpace();
    }

    return (
        <Provider store={filtrationStore}>
            <aside className={filterStyles['filtration-box']}>
                <h2 className={filterStyles['title']}>Фильтрация</h2>
                <div className={filterStyles['filters-list']}>
                    <CheckBoxesBlock
                        propertiesList={['option 1', 'option 2']}
                    />
                    <PriceBlock />
                </div>
                <AccessButton
                    title='Применить'
                    ariaLabel='Применить фильтры'
                    classNames={[filterStyles['access-button']]}
                />
            </aside>
        </Provider>
    );
}
