import CheckBoxesBlock from './CheckBoxesBlock';

import filterStyles from './Filtration.module.scss';

export default function Filtration() {
    return (
        <aside className={filterStyles['filtration-box']}>
            <h2 className={filterStyles['title']}>Фильтрация</h2>

            <CheckBoxesBlock />
        </aside>
    );
}
