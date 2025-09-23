'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import headerStyles from './Header.module.scss';

export default function SearchInput() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div
                className={headerStyles['input-block']}
                onClick={() => setShowModal(true)}
            >
                <img src='/images/search-icon.svg' alt='Search for products' />

                <input
                    type='text'
                    placeholder='Поиск пиццы...'
                    aria-label='Search products'
                />

                <button
                    className={clsx(
                        headerStyles['back-search-button'],
                        showModal && headerStyles['back-search-button-show']
                    )}
                    onClick={() => setShowModal(false)}
                >
                    <img src='/images/cross-icon.svg' alt='Close the search' />
                </button>
            </div>

            {showModal &&
                createPortal(
                    <div
                        className={headerStyles['modal-backdrop']}
                        onClick={() => setShowModal(false)}
                    ></div>,
                    document.body
                )}
        </>
    );
}
