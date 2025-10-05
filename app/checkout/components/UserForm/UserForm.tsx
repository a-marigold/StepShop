'use client';

import { useSelector } from 'react-redux';

import type { RootState } from '@/redux/store';

import CheckoutWidget from '@/UI/CheckoutWidget';
import PrimaryInput from '@/UI/PrimaryInput';

import formStyles from './UserForm.module.scss';

const userInputs = [{ title: '', errorLabelTitle: '', htmlId: '' }];

export default function Cart() {
    return (
        <CheckoutWidget title='1. Корзина'>
            <div className={formStyles['user-form']}>
                {userInputs.map((userInput) => (
                    <PrimaryInput
                        title={userInput.title}
                        htmlId={userInput.htmlId}
                        errorLabelTitle={userInput.errorLabelTitle}
                        isValid={true}
                    />
                ))}
            </div>
        </CheckoutWidget>
    );
}
