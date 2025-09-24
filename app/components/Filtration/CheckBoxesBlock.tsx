import CheckBox from '@UI/Checkbox';

import filterStyles from './Filtration.module.scss';

export default function CheckBoxesBlock() {
    return (
        <div className={filterStyles['checkboxes-block']}>
            <CheckBox />
            <CheckBox />
        </div>
    );
}
