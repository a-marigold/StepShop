import Cart from './components/Cart';
import UserForm from './components/UserForm';

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
                    <Cart />
                    <UserForm />
                </div>

                <div className={checkoutStyles['order-box']}>
                    <Cart />
                </div>
            </div>
        </main>
    );
}
