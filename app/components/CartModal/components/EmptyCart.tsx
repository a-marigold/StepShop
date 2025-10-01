'use client';

import AccessButton from '@/UI/AccessButton';

import cartStyles from './EmptyCart.module.scss';

interface EmptyCartProps {
    setShowModal: (showModal: boolean) => void;
}
export default function EmptyCart({ setShowModal }: EmptyCartProps) {
    return (
        <div className={cartStyles['empty-cart']}>
            <img
                src='/images/empty-cart.svg'
                alt='Корзина пуста'
                width={120}
                height={120}
            />

            <div className={cartStyles['text-block']}>
                <p className={cartStyles['title']}>Корзина пустая</p>
                <p className={cartStyles['description']}>
                    Добавьте хотя бы один товар, чтобы совершить заказ
                </p>
            </div>

            <AccessButton
                title='Вернуться назад'
                image='/images/white-arrow-left.svg'
                ariaLabel='Закрыть корзину'
                classNames={[cartStyles['access-button']]}
                clickAction={() => setShowModal(false)}
            />
        </div>
    );
}
