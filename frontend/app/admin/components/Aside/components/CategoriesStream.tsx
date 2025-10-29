'use client';

import type { CategoryListType, ProductType } from '@shared/types/ProductTypes';

import LoadingSpinner from '@/UI/LoadingSpinner';
import JSONCodeBlock from '@/UI/JSONCodeBlock';

import asideStyles from '../Aside.module.scss';

interface CategoriesStreamProps {
    categories: CategoryListType;
}
export default function CategoriesStream({
    categories,
}: CategoriesStreamProps) {
    return (
        <div>
            <p className={asideStyles['title']}>Категории</p>

            {categories?.length ? (
                <JSONCodeBlock json={categories} />
            ) : (
                <div className={asideStyles['loading-block']}>
                    <LoadingSpinner borderWidth='3px' size='32px' />
                </div>
            )}
        </div>
    );
}
