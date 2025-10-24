'use client';

import { Controller, useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import ApiError from '@/utils/errors/ApiError';
import { register } from '@/lib/api/auth';

import type { UserFormType, UserFormProps } from './UserFormTypes';

import UserForm from './UserForm';

import PrimaryInput from '@UI/PrimaryInput';

export function UserDataForm({
    setShowModal,
    isLoading,
    setIsLoading,
}: UserFormProps) {
    const { control, handleSubmit, setError } =
        useForm<UserFormType['userData']>();

    const email = useSelector((state: RootState) => state.user.user.email);

    async function submit(data: UserFormType['userData']) {
        setIsLoading(true);

        const { userName, userPassword: password } = data;

        const prepareData = { email: email, userName, password };

        try {
            const registerUserData = await register(prepareData);

            if (setShowModal) {
                setShowModal(false);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setError('userName', {
                    type: 'server',
                    message: error.message,
                });
                setError('userPassword', {
                    type: 'server',
                    message: error.message,
                });
            }
        } finally {
            setIsLoading(false);
        }
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
                rules={{ required: 'Введите имя пользователя' }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='user-name-input'
                        title='Имя пользователя'
                        isValid={!fieldState.error}
                        errorLabelTitle={fieldState.error?.message}
                        inputAction={field.onChange}
                    />
                )}
            />

            <Controller
                name='userPassword'
                control={control}
                rules={{ required: 'Введите пароль' }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        title='Пароль'
                        htmlId='user-password-input'
                        isValid={!fieldState.error}
                        errorLabelTitle={fieldState.error?.message}
                        inputType='password'
                        inputAction={field.onChange}
                    />
                )}
            />
        </UserForm>
    );
}
