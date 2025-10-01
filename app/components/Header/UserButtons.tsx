'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import AuthModal from '../AuthModal';
import CartModal from '../CartModal';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import headerStyles from './Header.module.scss';

export default function UserButtons() {
    const [showCartModal, setShowCartModal] = useState(false);

    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (showCartModal || showAuthModal) {
            lockBodyScroll();
        }

        return () => {
            unlockBodyScroll();
        };
    }, [showCartModal, showAuthModal]);

    return (
        <>
            <div className={headerStyles['user-buttons-block']}>
                <EmptyFilledButton
                    title='Войти'
                    ariaLabel='Войти в аккаунт'
                    classNames={[headerStyles['profile-button']]}
                    imageSettings={{ imageUrl: '/images/profile-icon.svg' }}
                    clickAction={() => setShowAuthModal(true)}
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
            {showAuthModal &&
                createPortal(
                    <AuthModal setShowModal={setShowAuthModal} />,

                    document.body
                )}
        </>
    );
}
