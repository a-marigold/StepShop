import CartWidget from './components/CartWidget';
import UserFormWidget from './components/UserFormWidget';

import checkoutStyles from './Checkout.module.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Оформление заказа',
    openGraph: {
        title: 'Оформление заказа',
    },

    robots: {
        index: false,
        follow: false,
    },
};

export default function Checkout() {
    return (
        <main className={checkoutStyles['checkout-page']}>
            <h1 className={checkoutStyles['title']}>Оформление заказа</h1>

            <div className={checkoutStyles['widgets-box']}>
                <div className={checkoutStyles['user-data-box']}>
                    <CartWidget />
                    <UserFormWidget />
                </div>

                <div className={checkoutStyles['order-box']}>
                    <CartWidget />
                </div>
            </div>
        </main>
    );
}
