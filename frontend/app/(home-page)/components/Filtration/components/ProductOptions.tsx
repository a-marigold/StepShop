'use client';

import { useState, useEffect } from 'react';

import { getOptions } from '@/lib/api/products/OptionsApiClient';

import { OptionListType } from '@shared/types/ProductTypes';

import CheckBoxesBlock from './CheckBoxesBlock';

import LoadingSpinner from '@/UI/LoadingSpinner';

import filterStyles from '../Filtration.module.scss';

export default function ProductOptions() {
    const [isLoading, setIsLoading] = useState(false);

    const [optionsList, setOptionsList] = useState<OptionListType>([]);

    async function loadOptions() {
        setIsLoading(true);

        try {
            const options = await getOptions();

            setOptionsList(options);

            setIsLoading(false);
        } catch {
            setOptionsList([]);
        }
    }

    useEffect(() => {
        loadOptions();
    }, []);

    const prepareOptionsList = optionsList.map((option) => {
        return option.name;
    });

    return (
        <>
            {isLoading ? (
                <div className={filterStyles['loading-block']}>
                    <LoadingSpinner size='26px' borderWidth='3px' />
                </div>
            ) : (
                <CheckBoxesBlock propertiesList={prepareOptionsList} />
            )}
        </>
    );
}
