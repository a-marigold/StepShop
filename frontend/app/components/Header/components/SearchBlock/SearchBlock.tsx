'use client';
import { useState, useEffect } from 'react';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import SearchModal from './SearchModal';
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

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showModal={showModal}
                setShowModal={setShowModal}
            />

            {!showModal && <SearchButton setShowModal={setShowModal} />}

            {showModal && (
                <SearchModal
                    searchQuery={searchQuery}
                    setShowModal={setShowModal}
                />
            )}
        </>
    );
}
