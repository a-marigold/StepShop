'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { UserFormType, UserFormProps } from './UserFormType';

import UserForm from './UserForm';
import PrimaryInput from '@UI/PrimaryInput';

export function EmailForm({ setAuthStep }: UserFormProps) {
    const { control, handleSubmit } = useForm<UserFormType['email']>();

    async function submit(data: UserFormType['email']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);

        setAuthStep((authStep) => authStep + 1);
    }

    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Вход в аккаунт'
            description='Введите адрес электронной почты, чтобы войти или зарегистрироваться'
            image='/images/phone-icon.svg'
            buttonTitle='Получить код в SMS'
            buttonAriaLabel='Получить код в SMS'
        >
            <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='email-input'
                        isValid={!fieldState.error}
                        errorLabelTitle='Введите адрес электронной почты'
                        placeholder='example@gmail.com'
                        inputAction={field.onChange}
                    />
                )}
            />
        </UserForm>
    );
}
