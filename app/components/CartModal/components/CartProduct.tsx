'use client';

import { memo } from 'react';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import {
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
} from '@/utils/cartGlobalState';

import { CURRENCY_SYMBOL } from '@/constants/currency';
import type { ProductType } from '@/types/ProductTypes';

import Image from 'next/image';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import productStyles from './CartProduct.module.scss';

interface CartProductProps extends Omit<ProductType, 'description'> {
    options: string;
}

export default memo(function CartProduct({
    image,
    title,
    options,
    price,
    quantity,
}: CartProductProps) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className={productStyles['cart-product']}>
            <Image src={image} alt={title} width={65} height={65} />

            <div className={productStyles['description-block']}>
                <div className={productStyles['text-block']}>
                    <p className={productStyles['title']}>{title}</p>
                    {/* TO DO HERE */}
                    <p className={productStyles['options']}> {options} </p>
                    {/*  */}
                </div>

                <div className={productStyles['horizontal-line']}></div>

                <div className={productStyles['order-block']}>
                    <div className={productStyles['quantity-block']}>
                        <EmptyFilledButton
                            className={productStyles['quantity-button']}
                            ariaLabel='Убрать один товар'
                            clickAction={() =>
                                handleDecreaseProductQuantity({
                                    title: title,
                                    price: price,
                                    quantity: quantity,
                                    dispatch: dispatch,
                                })
                            }
                        >
                            <svg
                                width={11}
                                height={2}
                                color='var(--accent-color)'
                            >
                                <use href='#minus-icon' />
                            </svg>
                        </EmptyFilledButton>

                        <span className={productStyles['quantity']}>
                            {quantity}
                        </span>

                        <EmptyFilledButton
                            // image='/images/plus-icon.svg'
                            className={productStyles['quantity-button']}
                            ariaLabel='Добавить 1 товар'
                            clickAction={() =>
                                handleIncreaseProductQuantity({
                                    title: title,
                                    price: price,
                                    dispatch: dispatch,
                                })
                            }
                        >
                            <svg
                                width={12}
                                height={12}
                                color='var(--accent-color)'
                            >
                                <use href='#plus-icon' />
                            </svg>
                        </EmptyFilledButton>
                    </div>

                    <span className={productStyles['price']}>
                        {price * quantity} {CURRENCY_SYMBOL}
                    </span>
                </div>
            </div>
        </div>
    );
});
