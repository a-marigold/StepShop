'use client';

import { useState, useEffect, useRef } from 'react';

import { getCategories } from '@/lib/api/products';
import type {
    CategoryType,
    CategoryListType,
} from '@shared/types/ProductTypes';

import LoadingSpinner from '@/UI/LoadingSpinner';

import clsx from 'clsx';
import navStyles from './Navigation.module.scss';

export default function Categories() {
    const [categories, setCategories] = useState<CategoryListType>();

    const [error, setError] = useState<string | null>(null);

    async function fetchCategories() {
        try {
            const categories = await getCategories();

            setCategories(categories);

            setCurrentCategory(categories[0].id);
        } catch {
            setError('Внутренняя ошибка сервера');
            setCategories([]);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const [currentCategory, setCurrentCategory] = useState<string>();

    const categoriesRef = useRef<
        Partial<Record<string, HTMLAnchorElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function changeCategory(
        categoryRef: HTMLAnchorElement | null,
        blockRef: HTMLDivElement | null
    ) {
        if (!categoryRef || !blockRef) return;

        blockRef.style.transform = `translateX(${categoryRef.offsetLeft}px)`;

        blockRef.style.width = `${categoryRef.offsetWidth}px`;
    }

    useEffect(() => {
        if (!categoriesRef || !activeBlockRef || !currentCategory) return;

        const currentCategoryRef = categoriesRef.current[currentCategory];

        if (!currentCategoryRef) return;

        const handleChangeCategory = () =>
            changeCategory(currentCategoryRef, activeBlockRef.current);

        window.addEventListener('resize', handleChangeCategory);

        handleChangeCategory();

        return () => {
            window.removeEventListener('resize', handleChangeCategory);
        };
    }, [currentCategory]);

    return (
        <nav className={navStyles['categories-block']}>
            <div ref={activeBlockRef} className={navStyles['active-block']} />

            {!!categories?.length ? (
                categories.map((category) => (
                    <a
                        key={category.id}
                        href={`#${category.name}`}
                        ref={(element) => {
                            categoriesRef.current[category.id] = element;
                        }}
                        className={clsx(
                            navStyles['category-button'],
                            category.id === currentCategory &&
                                navStyles['active-button']
                        )}
                        aria-label={`Переключиться к ${category.name}`}
                        onClick={() => setCurrentCategory(category.id)}
                    >
                        {category.name}
                    </a>
                ))
            ) : (
                <div className={navStyles['loading-block']}>
                    <LoadingSpinner size='20px' borderWidth='3px' />
                </div>
            )}
        </nav>
    );
}
