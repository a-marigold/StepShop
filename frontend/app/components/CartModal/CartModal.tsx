'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import Cart from './components/Cart';
import EmptyCart from './components/EmptyCart';

import ModalBackdrop from '@/UI/ModalBackdrop';

import cartStyles from './CartModal.module.scss';

interface CartModalProps {
    setShowModal: (showModal: boolean) => void;
}

export default function CartModal({ setShowModal }: CartModalProps) {
    const cartProducts = useSelector(
        (state: RootState) => state.cart.cartProducts
    );
    return (
        <ModalBackdrop
            props={{ className: cartStyles['modal-backdrop'] }}
            setShowModal={setShowModal}
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
        </ModalBackdrop>
    );
}
