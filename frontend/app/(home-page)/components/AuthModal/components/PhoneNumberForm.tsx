'use client';

import { Controller, useForm } from 'react-hook-form';

import type { UserFormType } from './UserFormType';

import { apiOrigin } from '@/utils/getApiOrigin';

import Image from 'next/image';

import UserForm from './UserForm';
import PrimaryInput from '@UI/PrimaryInput';
import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

export default function PhoneNumberForm() {
    const { control, handleSubmit } = useForm<UserFormType['phoneNumber']>();

    async function submit(data: UserFormType['phoneNumber']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);
    }

    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Вход в аккаунт'
            description='Введите номер телефона, чтобы войти или зарегистрироваться'
            image='/images/phone-icon.svg'
            buttonTitle='Получить код в SMS'
            buttonAriaLabel='Получить код в SMS'
        >
            <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='phone-number-input'
                        isValid={!fieldState.error}
                        errorLabelTitle='Введите номер телефона'
                        placeholder='+X XXX XXX XX-XX'
                        inputAction={field.onChange}
                    />
                )}
            />
        </UserForm>
    );
}
