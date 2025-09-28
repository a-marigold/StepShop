import Link from 'next/link';

import AccessButton from '@/UI/AccessButton';

import cartStyles from './Cart.module.scss';

export default function Cart() {
    return (
        <div>
            <div className={cartStyles['products-box']}></div>
            <div className={cartStyles['order-block']}></div>
        </div>
    );
}
