'use client';

import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import CartProduct from './CartProduct';

import CheckoutWidget from '@/UI/CheckoutWidget';

import cartStyles from './CartWidget.module.scss';

export default function CartWidget() {
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );

    return (
        <CheckoutWidget title='1. Корзина'>
            <div className={cartStyles['products-box']}>
                {cartProducts.map((cartProduct) => (
                    <CartProduct
                        key={cartProduct.id}
                        id={cartProduct.id}
                        title={cartProduct.title}
                        image={cartProduct.image}
                        price={cartProduct.price}
                        currencySymbol={CURRENCY_SYMBOL}
                        quantity={cartProduct.quantity}
                        options={'option1, option2, option3'}
                    ></CartProduct>
                ))}
            </div>
        </CheckoutWidget>
    );
}
