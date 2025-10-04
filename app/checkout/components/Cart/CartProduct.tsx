import type { ProductType } from '@/types/ProductTypes';

import EmptyFilledButton from '@/UI/EmptyFilledButton';

import cartStyles from './Cart.module.scss';

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
                    {price} {currencySymbol}
                </p>

                <div className={cartStyles['quantity-block']}>
                    <EmptyFilledButton
                        image='/images/minus-icon.svg'
                        classNames={[cartStyles['quantity-button']]}
                        ariaLabel='Убрать один товар'
                        // clickAction={() => {
                        //     dispatch(decreaseProductQuantity({ title: title }));
                        //     dispatch(decreaseTotalAmount(price));
                        // }}
                    />

                    <span className={cartStyles['quantity']}>{quantity}</span>

                    <EmptyFilledButton
                        image='/images/plus-icon.svg'
                        classNames={[cartStyles['quantity-button']]}
                        ariaLabel='Добавить 1 товар'
                        // clickAction={() => {
                        //     dispatch(increaseProductQuantity({ title: title }));
                        //     dispatch(increaseTotalAmount(price));
                        // }}
                    />
                </div>
            </div>
        </div>
    );
}
