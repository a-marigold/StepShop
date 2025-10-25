import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import CartModal from '@/app/(home-page)/components/CartModal';

import EmptyFilledButton from '@/UI/EmptyFilledButton';
import AccessButton from '@/UI/AccessButton';

import userStyles from './UserButtons.module.scss';

export default function CartButton() {
    const [showCartModal, setShowCartModal] = useState(false);

    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (showCartModal) {
            lockBodyScroll();
        }

        return () => {
            unlockBodyScroll();
        };
    }, [showCartModal, showAuthModal]);

    const totalAmount = useSelector(
        (state: RootState) => state.cart.totalAmount
    );

    const cartProductsLength = useSelector(
        (state: RootState) => state.cart.cartProducts
    ).length;

    return (
        <>
            {!!cartProductsLength ? (
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

            {showCartModal &&
                createPortal(
                    <CartModal setShowModal={setShowCartModal} />,

                    document.body
                )}
        </>
    );
}
