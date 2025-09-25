import CheckBox from '@UI/Checkbox';

import filterStyles from './Filtration.module.scss';

interface CheckBoxesBlockProps {
    title?: string;
    propertiesList: string[];
}

export default function CheckBoxesBlock({
    title,
    propertiesList,
}: CheckBoxesBlockProps) {
    return (
        <div
            className={`${filterStyles['checkboxes-block']} ${filterStyles['filter-block']}`}
        >
            {title && (
                <h3 className={filterStyles['filter-block-title']}>{title}</h3>
            )}

            {propertiesList.map((property, index) => (
                <CheckBox key={`${title}-${property}-${index}`} />
            ))}
        </div>
    );
}
