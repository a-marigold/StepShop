import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';

import {
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
} from '@/utils/cartGlobalState';

import { CartProductProps } from '@/types/CartProductsProps';

import Image from 'next/image';
import EmptyFilledButton from '@/UI/EmptyFilledButton';
import cartStyles from './CartWidget.module.scss';

export default function CartProduct({
    image,
    title,

    options,
    price,
    currencySymbol,

    quantity,
}: CartProductProps) {
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    const dispatch = useDispatch<AppDispatch>();

    const lastProductCheck = !!(cartProducts.length === 1 && quantity === 1);

    return (
        <div className={cartStyles['cart-product']}>
            <Image
                src={image}
                alt='Изображение товара'
                width={65}
                height={65}
            />

            <div className={cartStyles['order-block']}>
                <div className={cartStyles['title-block']}>
                    <p className={cartStyles['title']}>{title}</p>

                    {options && (
                        <p className={cartStyles['options']}>{options}</p>
                    )}
                </div>
                <p className={cartStyles['price']}>
                    {price * quantity} {currencySymbol}
                </p>
                <div className={cartStyles['quantity-block']}>
                    <EmptyFilledButton
                        className={cartStyles['quantity-button']}
                        ariaLabel='Убрать один товар'
                        isDisabled={lastProductCheck}
                        clickAction={() =>
                            handleDecreaseProductQuantity({
                                title: title,
                                price: price,
                                quantity: quantity,
                                dispatch: dispatch,
                            })
                        }
                    >
                        {lastProductCheck ? (
                            <svg
                                width={11}
                                height={2}
                                color='var(--disabled-color)'
                            >
                                <use href='#minus-icon' />
                            </svg>
                        ) : (
                            <svg
                                width={11}
                                height={2}
                                color='var(--accent-color)'
                            >
                                <use href='#minus-icon' />
                            </svg>
                        )}
                    </EmptyFilledButton>

                    <span className={cartStyles['quantity']}>{quantity}</span>

                    <EmptyFilledButton
                        className={cartStyles['quantity-button']}
                        ariaLabel='Добавить один товар'
                        clickAction={() =>
                            handleIncreaseProductQuantity({
                                title: title,
                                price: price,
                                dispatch: dispatch,
                            })
                        }
                    >
                        <svg width={12} height={12} color='var(--accent-color)'>
                            <use href='#plus-icon'></use>
                        </svg>
                    </EmptyFilledButton>
                </div>
            </div>
        </div>
    );
}
