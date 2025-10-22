'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { UserFormProps, UserFormType } from './UserFormType';

import UserForm from './UserForm';
import CodeInput from '@UI/CodeInput';

export default function PhoneCodeForm({ setAuthStep }: UserFormProps) {
    const { control, handleSubmit, watch } =
        useForm<UserFormType['phoneCode']>();

    async function submit(data: UserFormType['phoneCode']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);

        setAuthStep((authStep) => authStep + 1);
    }

    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Введите код'
            description='SMS-код был отправлен на номер телефона +7 (921) 450-20-25'
            image='/images/phone-code-icon.svg'
            buttonTitle='Запросить код — через {SECONDS} сек.'
            buttonAriaLabel='Запросить код — через {SECONDS} сек.'
        >
            <Controller
                name='phoneCode'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <CodeInput
                        changeAction={field.onChange}
                        ariaLabel='Введите код из SMS'
                        inputQuantity={4}
                    />
                )}
            />
        </UserForm>
    );
}
