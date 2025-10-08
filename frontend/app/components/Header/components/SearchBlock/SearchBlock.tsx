'use client';
import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

import headerStyles from '../../Header.module.scss';

export default function SearchBlock() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('search-modal-opened');

            lockBodyScroll();
        }

        return () => {
            document.body.classList.remove('search-modal-opened');

            unlockBodyScroll();
        };
    }, [showModal]);

    return (
        <>
            <SearchInput showModal={showModal} setShowModal={setShowModal} />

            {!showModal && <SearchButton setShowModal={setShowModal} />}

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
