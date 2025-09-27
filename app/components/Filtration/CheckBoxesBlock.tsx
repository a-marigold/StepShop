'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './redux';

import { setOptions } from './redux/filtrationSlice';

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
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            className={`${filterStyles['checkboxes-block']} ${filterStyles['filter-block']}`}
        >
            {title && (
                <h3 className={filterStyles['filter-block-title']}>{title}</h3>
            )}

            {propertiesList.map((property, index) => (
                <CheckBox
                    key={`${title}-${property}-${index}`}
                    name={property}
                />
            ))}
        </div>
    );
}
