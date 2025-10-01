'use client';

// TODO: Redirect on payment page
// import Link from 'next/link';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import EmptyCart from './components/EmptyCart';

import cartStyles from './CartModal.module.scss';
import Cart from './components/Cart';

interface CartModalProps {
    setShowModal: (showModal: boolean) => void;
}

export default function CartModal({ setShowModal }: CartModalProps) {
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    return (
        <div
            className={cartStyles['modal-backdrop']}
            onClick={() => setShowModal(false)}
        >
            <div
                className={cartStyles['cart-modal']}
                onClick={(event) => event.stopPropagation()}
            >
                {cartProducts.length ? (
                    <Cart setShowModal={setShowModal} />
                ) : (
                    <EmptyCart setShowModal={setShowModal} />
                )}
            </div>
        </div>
    );
}
