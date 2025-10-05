import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import {
    handleDecreaseProductQuantity,
    handleIncreaseProductQuantity,
} from '@/utils/cartGlobalState';

import type { ProductType } from '@/types/ProductTypes';

import EmptyFilledButton from '@/UI/EmptyFilledButton';

import cartStyles from './CartWidget.module.scss';

interface CartProductProps extends Omit<ProductType, 'description'> {
    options: string;
}

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

    const lastProductCheck = !!(
        cartProducts.length === 1 &&
        quantity &&
        quantity === 1
    );

    return (
        <div className={cartStyles['cart-product']}>
            <img src={image} alt='Изображение товара' width={65} height={65} />

            <div className={cartStyles['order-block']}>
                <div className={cartStyles['title-block']}>
                    <p className={cartStyles['title']}>{title}</p>

                    {options && (
                        <p className={cartStyles['options']}>{options}</p>
                    )}
                </div>
                <p className={cartStyles['price']}>
                    {quantity ? price * quantity : price} {currencySymbol}
                </p>
                <div className={cartStyles['quantity-block']}>
                    <EmptyFilledButton
                        image={
                            lastProductCheck
                                ? '/images/disabled-minus-icon.svg'
                                : '/images/minus-icon.svg'
                        }
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
                    />

                    <span className={cartStyles['quantity']}>{quantity}</span>

                    <EmptyFilledButton
                        image='/images/plus-icon.svg'
                        className={cartStyles['quantity-button']}
                        ariaLabel='Добавить один товар'
                        clickAction={() =>
                            handleIncreaseProductQuantity({
                                title: title,
                                price: price,
                                dispatch: dispatch,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
}
