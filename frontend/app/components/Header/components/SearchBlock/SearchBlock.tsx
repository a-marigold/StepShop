'use client';

import { useState, useEffect, useRef } from 'react';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import SearchModal from './SearchModal';

import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

export default function SearchBlock() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('search-modal-opened');

            lockBodyScroll();
            calcModalLayout(searchInputRef.current, searchModalRef.current);
        }

        return () => {
            document.body.classList.remove('search-modal-opened');

            unlockBodyScroll();
        };
    }, [showModal]);

    const [searchQuery, setSearchQuery] = useState('');

    function calcModalLayout(
        elementRef: HTMLElement | null,
        modalRef: HTMLDivElement | null
    ) {
        if (!elementRef || !modalRef) return;

        const elementLayout = elementRef.getBoundingClientRect();

        modalRef.style.width = `${elementLayout.width}px`;

        modalRef.style.transform = `translate(${elementLayout.left}px, ${
            elementLayout.top + elementLayout.height
        }px)`;
    }

    const searchInputRef = useRef<HTMLInputElement>(null);

    const searchModalRef = useRef<HTMLDivElement>(null);

    const resizeObserver = new ResizeObserver(() => {
        calcModalLayout(searchInputRef.current, searchModalRef.current);
    });

    useEffect(() => {
        if (!searchInputRef.current) return;
        resizeObserver.observe(searchInputRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <>
            <SearchInput
                ref={searchInputRef}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showModal={showModal}
                setShowModal={setShowModal}
            />

            {!showModal && <SearchButton setShowModal={setShowModal} />}

            {showModal && (
                <SearchModal
                    ref={searchModalRef}
                    searchQuery={searchQuery}
                    setShowModal={setShowModal}
                />
            )}
        </>
    );
}
