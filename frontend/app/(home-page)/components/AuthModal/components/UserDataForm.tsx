'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { UserFormType, UserFormProps } from './UserFormTypes';

import UserForm from './UserForm';

import PrimaryInput from '@UI/PrimaryInput';

export function UserDataForm({
    setShowModal,
    isLoading,
    setIsLoading,
}: UserFormProps) {
    const { control, handleSubmit } = useForm<UserFormType['userData']>();

    async function submit(data: UserFormType['userData']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);
    }

    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Создание аккаунта'
            description='Введите имя пользователя и пароль'
            buttonTitle='Отправить'
            buttonAriaLabel='Отправить'
            isLoading={isLoading}
        >
            <Controller
                name='userName'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='user-name-input'
                        title='Имя пользователя'
                        isValid={!fieldState.error}
                        errorLabelTitle='Введите имя пользователя'
                        inputAction={field.onChange}
                    />
                )}
            />

            <Controller
                name='userPassword'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        title='Пароль'
                        htmlId='user-password-input'
                        isValid={!fieldState.error}
                        errorLabelTitle='Введите пароль'
                        inputAction={field.onChange}
                    />
                )}
            />
        </UserForm>
    );
}
