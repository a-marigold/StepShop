'use client';

import type { SearchProps } from './SearchProps';

import clsx from 'clsx';

import headerStyles from '../../Header.module.scss';

interface SearchInputProps extends SearchProps {
    searchQuery: string;

    setSearchQuery: (searchQuery: string) => void;
}

export default function SearchInput({
    searchQuery,
    setSearchQuery,
    showModal,
    setShowModal,
}: SearchInputProps) {
    return (
        <>
            <div
                className={clsx(
                    headerStyles['input-block'],
                    showModal && headerStyles['active-input-block']
                )}
                onFocus={() => setShowModal(true)}
                onBlur={() => setShowModal(false)}
            >
                <img src='/images/search-icon.svg' alt='' />

                <input
                    type='text'
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder='Поиск товаров...'
                    aria-label='Поиск товаров'
                />

                <button
                    className={clsx(
                        headerStyles['back-search-button'],
                        showModal && headerStyles['back-search-button-show']
                    )}
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowModal(false);
                    }}
                    aria-label='Закрыть поиск товаров'
                >
                    <img src='/images/cross-icon.svg' alt='' />
                </button>
            </div>
        </>
    );
}
