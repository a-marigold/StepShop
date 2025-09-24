import Categories from './Categories';
import SortButton from './SortButton';

import navStyles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <div className={navStyles['navigaiton-box']}>
            <h2 className={navStyles['title']}>Все пиццы</h2>

            <div className={navStyles['navigation-group']}>
                <Categories />
                <SortButton />
            </div>
        </div>
    );
}
