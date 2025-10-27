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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchCategories() {
        setIsLoading(true);

        try {
            const categories = await getCategories();

            setCategories(categories);

            setCurrentCategory(categories[0].id);
        } catch {
            setError('Внутренняя ошибка сервера');

            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const [currentCategory, setCurrentCategory] = useState<string>();

    const categoriesRef = useRef<
        Partial<Record<string, HTMLButtonElement | null>>
    >({});

    const activeBlockRef = useRef<HTMLDivElement>(null);

    function changeCategory(
        categoryRef: HTMLButtonElement | null,
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
                    <button
                        key={category.id}
                        ref={(element) => {
                            categoriesRef.current[category.id] = element;
                        }}
                        className={clsx(
                            navStyles['category-button'],
                            category.name === currentCategory &&
                                navStyles['active-button']
                        )}
                        aria-label={`Переключиться к ${category.name}`}
                        onClick={() => setCurrentCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))
            ) : (
                <div className={navStyles['loading-block']}>
                    <LoadingSpinner size='20px' borderWidth='2px' />
                </div>
            )}
        </nav>
    );
}
