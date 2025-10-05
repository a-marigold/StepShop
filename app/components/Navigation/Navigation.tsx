import Categories from './Categories';
import SortButton from './SortButton';

import navStyles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <>
            <div className={navStyles['navigaiton-box']}>
                <h1 className={navStyles['title']}>Все пиццы</h1>
            </div>
            <div className={navStyles['navigation-group']}>
                <Categories />
                <SortButton />
            </div>
        </>
    );
}
