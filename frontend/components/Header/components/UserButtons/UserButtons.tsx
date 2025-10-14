'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import AuthModal from '@/app/(public-pages)/components/AuthModal';
import CartModal from '@/app/(public-pages)/components/CartModal';

import EmptyFilledButton from '@UI/EmptyFilledButton';
import AccessButton from '@/UI/AccessButton';

import userStyles from './UserButtons.module.scss';

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
            <div
                className={`${userStyles['user-buttons-block']} user-buttons-public`}
            >
                {/* ^^ user-buttons-public class used for setting display none on them by using class toggle on body ^^*/}

                <EmptyFilledButton
                    title='Войти'
                    ariaLabel='Войти в аккаунт'
                    className={userStyles['profile-button']}
                    // image='/images/profile-icon.svg'
                    clickAction={() => setShowAuthModal(true)}
                >
                    <svg width={12} height={16} color='var(--accent-color)'>
                        <use href='#profile-icon' />
                    </svg>
                </EmptyFilledButton>
                {cartProductsLength ? (
                    <AccessButton
                        ariaLabel='Открыть корзину'
                        clickAction={() => setShowCartModal(true)}
                        className={userStyles['ready-cart-button']}
                    >
                        <p className={userStyles['total-amount']}>
                            {totalAmount} {CURRENCY_SYMBOL}
                        </p>

                        <div className={userStyles['vertical-line']} />

                        <span className={userStyles['products-quantity-block']}>
                            <svg
                                width={18}
                                height={18}
                                color='var(--main-bg-color)'
                            >
                                <use href='#cart-icon' />
                            </svg>
                            &nbsp;
                            {cartProductsLength}
                        </span>
                    </AccessButton>
                ) : (
                    <EmptyFilledButton
                        ariaLabel='Открыть корзину'
                        className={userStyles['cart-button']}
                        clickAction={() => setShowCartModal(true)}
                    >
                        <svg width={18} height={18} color='var(--accent-color)'>
                            <use href='#cart-icon' />
                        </svg>
                    </EmptyFilledButton>
                )}
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
