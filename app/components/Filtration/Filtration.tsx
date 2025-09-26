import CheckBoxesBlock from './CheckBoxesBlock';
import PriceBlock from './PriceBlock';
import AccesButton from '@UI/AccesButton';

import filterStyles from './Filtration.module.scss';

export default function Filtration() {
    return (
        <aside className={filterStyles['filtration-box']}>
            <h2 className={filterStyles['title']}>Фильтрация</h2>

            <div className={filterStyles['filters-list']}>
                <CheckBoxesBlock propertiesList={['option 1', 'option 2']} />

                <PriceBlock />
            </div>

            <AccesButton
                title='Применить'
                ariaLabel='Применить фильтры'
                classNames={[filterStyles['acces-button-block']]}
            />
        </aside>
    );
}
