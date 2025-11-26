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

    useEffect(() => {
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

        loadOptions();
    }, []);

    // TODO: Database with product options died. Migrate on new database to enable the options fetch. Options are in hard code temporarily
    // const prepareOptionsList = optionsList.map((option) => {
    //     return option.name;
    // });

    //! Temporarily:
    const { 0: prepareOptionsList } = useState<string[]>([
        'Спортивные',
        'Повседневные',
    ]);

    return (
        // <>
        //     {isLoading ? (
        //         <div className={filterStyles['loading-block']}>
        //             <LoadingSpinner size='26px' borderWidth='3px' />
        //         </div>
        //     ) : (
        //         <CheckBoxesBlock propertiesList={prepareOptionsList} />
        //     )}
        // </>

        <CheckBoxesBlock propertiesList={prepareOptionsList} />
    );
}
