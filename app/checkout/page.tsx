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

export default function () {
    return <main className={checkoutStyles['checkout-page']}></main>;
}
