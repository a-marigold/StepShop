'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import CheckoutWidget from '@/UI/CheckoutWidget';
import AccessButton from '@/UI/AccessButton';

import amountStyles from './TotalAmountWidget.module.scss';

export default function TotalAmountWidget() {
    return (
        <CheckoutWidget title='2. Персональная информация'>
            <div></div>
        </CheckoutWidget>
    );
}
