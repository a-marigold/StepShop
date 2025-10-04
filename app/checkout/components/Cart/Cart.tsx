import CartProduct from './CartProduct';

import CheckoutWidget from '@/UI/CheckoutWidget';

import cartStyles from './Cart.module.scss';

export default function Cart() {
    return (
        <CheckoutWidget title='1. Корзина'>
            <div className={cartStyles['products-box']}>
                <CartProduct
                    title='s'
                    image={'/images/white-t-shirt.png'}
                    price={10}
                    currencySymbol='₸'
                    quantity={2}
                    options={'option1, option2, option3'}
                ></CartProduct>
            </div>
        </CheckoutWidget>
    );
}
