'use client';

import type { Ref } from 'react';

import type { SearchProps } from './SearchProps';

import clsx from 'clsx';

import headerStyles from '../../Header.module.scss';

interface SearchInputProps extends SearchProps {
    searchQuery: string;

    setSearchQuery: (searchQuery: string) => void;

    ref: Ref<HTMLInputElement>;
}

export default function SearchInput({ ref, ...props }: SearchInputProps) {
    const { showModal, setShowModal, searchQuery, setSearchQuery } = props;

    return (
        <>
            <div
                className={clsx(
                    headerStyles['input-block'],
                    showModal && headerStyles['active-input-block']
                )}
                ref={ref}
            >
                <img src='/images/search-icon.svg' alt='' />

                <input
                    type='text'
                    value={searchQuery}
                    onChange={(event) => {
                        if (!showModal) {
                            setShowModal(true);
                        }
                        setSearchQuery(event.target.value);
                    }}
                    placeholder='Поиск товаров...'
                    aria-label='Поиск товаров'
                    onFocus={() => setShowModal(true)}
                    onBlur={() => setShowModal(false)}
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
