'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import {
    increaseProductQuantity,
    decreaseProductQuantity,
    increaseTotalAmount,
    decreaseTotalAmount,
} from '@/redux/CartSlice';

import Image from 'next/image';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import productStyles from './CartProduct.module.scss';

interface CartProductProps {
    image: string;

    title: string;

    //
    //
    // TODO: Add options for each product. ( Need to update products JSON on server )
    // options: string;

    price: number;
    quantity?: number;
}

export default function CartProduct({
    image,
    title,
    // options,
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
                    {/* <p className={productStyles['options']}>{options}</p> */}
                    {/*  */}
                </div>

                <div className={productStyles['horizontal-line']}></div>

                <div className={productStyles['order-block']}>
                    <div className={productStyles['quantity-block']}>
                        <EmptyFilledButton
                            imageSettings={{
                                imageUrl: '/images/minus-icon.svg',
                            }}
                            classNames={[productStyles['quantity-button']]}
                            ariaLabel='Убрать один товар'
                            clickAction={() => {
                                dispatch(
                                    decreaseProductQuantity({ title: title })
                                );
                                dispatch(decreaseTotalAmount(price));
                            }}
                        />

                        <span className={productStyles['quantity']}>
                            {quantity}
                        </span>

                        <EmptyFilledButton
                            imageSettings={{
                                imageUrl: '/images/plus-icon.svg',
                            }}
                            classNames={[productStyles['quantity-button']]}
                            ariaLabel='Добавить 1 товар'
                            clickAction={() => {
                                dispatch(
                                    increaseProductQuantity({ title: title })
                                );
                                dispatch(increaseTotalAmount(price));
                            }}
                        />
                    </div>

                    <span className={productStyles['price']}>{price} ₸</span>
                </div>
            </div>
        </div>
    );
}
