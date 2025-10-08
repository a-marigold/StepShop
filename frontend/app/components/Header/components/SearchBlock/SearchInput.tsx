'use client';

import type { SearchProps } from './SearchProps';

import clsx from 'clsx';
import headerStyles from '../../Header.module.scss';

export default function SearchInput({ showModal, setShowModal }: SearchProps) {
    return (
        <>
            <div
                className={clsx(
                    headerStyles['input-block'],
                    showModal && headerStyles['active-input-block']
                )}
                onClick={() => setShowModal(true)}
                aria-label='Найти продукты'
            >
                <img src='/images/search-icon.svg' alt='' />

                <input type='text' placeholder='Поиск пиццы...' />

                <button
                    className={clsx(
                        headerStyles['back-search-button'],
                        showModal && headerStyles['back-search-button-show']
                    )}
                    onClick={(event) => {
                        event.stopPropagation();
                        setShowModal(false);
                    }}
                    aria-label='Закрыть поиск продуктов'
                >
                    <img src='/images/cross-icon.svg' alt='' />
                </button>
            </div>
        </>
    );
}
