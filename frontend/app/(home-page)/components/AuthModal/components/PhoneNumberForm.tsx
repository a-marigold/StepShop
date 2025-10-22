'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { UserFormType, UserFormProps } from './UserFormType';

import UserForm from './UserForm';
import PrimaryInput from '@UI/PrimaryInput';

export default function PhoneNumberForm({ setAuthStep }: UserFormProps) {
    const { control, handleSubmit } = useForm<UserFormType['phoneNumber']>();

    async function submit(data: UserFormType['phoneNumber']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);
        1;

        setAuthStep((authStep) => authStep + 1);
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
