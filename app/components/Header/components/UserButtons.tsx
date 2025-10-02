'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import AuthModal from '@/app/components/AuthModal';
import CartModal from '@/app/components/CartModal';

import EmptyFilledButton from '@UI/EmptyFilledButton';
// import AccessButton from '@/UI/AccessButton';

import headerStyles from '../Header.module.scss';

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

    const cartProductsLength = useSelector(
        (state: RootState) => state.cart.cartProducts
    ).length;
    const totalAmount = useSelector(
        (state: RootState) => state.cart.totalAmount
    );

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

                {/* {cartProductsLength ? (
                    <AccessButton />
                ) : ( */}

                <EmptyFilledButton
                    ariaLabel='Открыть корзину'
                    classNames={[headerStyles['cart-button']]}
                    imageSettings={{ imageUrl: '/images/cart-icon.svg' }}
                    clickAction={() => setShowCartModal(true)}
                />

                {/* )} */}
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
