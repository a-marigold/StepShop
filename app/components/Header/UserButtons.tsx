'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import CartModal from '../CartModal';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import headerStyles from './Header.module.scss';

export default function UserButtons() {
    const [showCartModal, setShowCartModal] = useState(false);

    useEffect(() => {
        if (showCartModal) {
            lockBodyScroll();
        }
        return () => {
            unlockBodyScroll();
        };
    }, [showCartModal]);

    return (
        <>
            <div className={headerStyles['user-buttons-block']}>
                <EmptyFilledButton
                    title='Войти'
                    ariaLabel='Войти в аккаунт'
                    classNames={[headerStyles['profile-button']]}
                    imageSettings={{ imageUrl: '/images/profile-icon.svg' }}
                />

                <EmptyFilledButton
                    ariaLabel='Открыть корзину'
                    classNames={[headerStyles['cart-button']]}
                    imageSettings={{ imageUrl: '/images/cart-icon.svg' }}
                    clickAction={() => setShowCartModal(true)}
                />
            </div>

            {showCartModal &&
                createPortal(
                    <CartModal setShowModal={setShowCartModal} />,
                    document.body
                )}
        </>
    );
}
