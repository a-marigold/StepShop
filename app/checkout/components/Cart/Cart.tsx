import CheckoutWidget from '@/UI/CheckoutWidget';

import cartStyles from './Cart.module.scss';

export default function Cart() {
    return (
        <CheckoutWidget title='1. Корзина'>
            <div className={cartStyles['products-box']}></div>
        </CheckoutWidget>
    );
}
