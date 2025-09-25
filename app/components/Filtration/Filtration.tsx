import CheckBoxesBlock from './CheckBoxesBlock';
import PriceBlock from './PriceBlock';

import filterStyles from './Filtration.module.scss';

export default function Filtration() {
    return (
        <aside className={filterStyles['filtration-box']}>
            <h2 className={filterStyles['title']}>Фильтрация</h2>

            <div className={filterStyles['filters-list']}>
                <CheckBoxesBlock
                    propertiesList={['Сырный соус', 'Сырный соус']}
                />

                <PriceBlock />
            </div>
        </aside>
    );
}
