'use client';

import { memo } from 'react';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addOption, deleteOption } from '../redux/filtrationSlice';

import CheckBox from '@UI/Checkbox';

import filterStyles from '../Filtration.module.scss';

interface CheckBoxesBlockProps {
    title?: string;
    propertiesList: string[];
}

export default memo(function CheckBoxesBlock({
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
                    inputAction={(event) =>
                        event.target.checked
                            ? dispatch(addOption(property))
                            : dispatch(deleteOption(property))
                    }
                />
            ))}
        </div>
    );
});
