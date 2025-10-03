'use client';

import { useState, useEffect } from 'react';

import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import AuthModal from '@/app/components/AuthModal';
import CartModal from '@/app/components/CartModal';

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
            <div className={userStyles['user-buttons-block']}>
                <EmptyFilledButton
                    title='Войти'
                    ariaLabel='Войти в аккаунт'
                    classNames={[userStyles['profile-button']]}
                    image='/images/profile-icon.svg'
                    clickAction={() => setShowAuthModal(true)}
                />

                {cartProductsLength ? (
                    <AccessButton
                        ariaLabel='Открыть корзину'
                        clickAction={() => setShowCartModal(true)}
                        className={userStyles['ready-cart-button']}
                    >
                        <p className={userStyles['total-amount']}>
                            {totalAmount} ₸
                        </p>

                        <div className={userStyles['vertical-line']} />

                        <span className={userStyles['products-quantity-block']}>
                            <svg
                                width='18'
                                height='18'
                                viewBox='0 0 18 18'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M6.33333 16.3332C7.06971 16.3332 7.66667 15.7362 7.66667 14.9998C7.66667 14.2635 7.06971 13.6665 6.33333 13.6665C5.59695 13.6665 5 14.2635 5 14.9998C5 15.7362 5.59695 16.3332 6.33333 16.3332Z'
                                    stroke='white'
                                    strokeWidth='1.8'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M14.3333 16.3332C15.0697 16.3332 15.6667 15.7362 15.6667 14.9998C15.6667 14.2635 15.0697 13.6665 14.3333 13.6665C13.597 13.6665 13 14.2635 13 14.9998C13 15.7362 13.597 16.3332 14.3333 16.3332Z'
                                    stroke='white'
                                    strokeWidth='1.8'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M4.77984 4.99984H16.3332L15.2132 10.5932C15.1522 10.9001 14.9852 11.1758 14.7415 11.372C14.4977 11.5683 14.1927 11.6725 13.8798 11.6665H6.83317C6.50763 11.6693 6.19232 11.5528 5.94671 11.3391C5.70109 11.1255 5.54215 10.8293 5.49984 10.5065L4.4865 2.8265C4.44448 2.50599 4.28745 2.21167 4.04464 1.99828C3.80182 1.7849 3.48976 1.66699 3.1665 1.6665H1.6665'
                                    stroke='white'
                                    strokeWidth='1.8'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            &nbsp;
                            {cartProductsLength}
                        </span>
                    </AccessButton>
                ) : (
                    <EmptyFilledButton
                        ariaLabel='Открыть корзину'
                        classNames={[userStyles['cart-button']]}
                        image='/images/cart-icon.svg'
                        clickAction={() => setShowCartModal(true)}
                    />
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
