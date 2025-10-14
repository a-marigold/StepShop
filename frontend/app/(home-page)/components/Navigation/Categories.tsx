'use client';

import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import navStyles from './Navigation.module.scss';

const categories = [
    { name: 'Category1' },

    { name: 'Category2' },

    { name: 'Category3' },

    { name: 'Category4' },

    { name: 'Category5' },

    { name: 'Category6' },
] as const;
type Category = (typeof categories)[number]['name'];

export default function Categories() {
    const [currentCategory, setCurrentCategory] =
        useState<Category>('Category1');

    const categoriesRef = useRef<
        Partial<Record<Category, HTMLButtonElement | null>>
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
        if (!categoriesRef || !activeBlockRef) return;

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

            {categories.map((category, index) => (
                <button
                    key={`${category}-${index}`}
                    ref={(element) => {
                        categoriesRef.current[category.name] = element;
                    }}
                    className={clsx(
                        navStyles['category-button'],
                        category.name === currentCategory &&
                            navStyles['active-button']
                    )}
                    aria-label={`Переключиться к ${category.name}`}
                    onClick={() => setCurrentCategory(category.name)}
                >
                    {category.name}
                </button>
            ))}
        </nav>
    );
}
