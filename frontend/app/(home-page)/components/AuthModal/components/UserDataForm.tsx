'use client';

import { Controller, useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { setUser } from '../redux';

import ApiError from '@/utils/errors/ApiError';
import { apiOrigin } from '@/utils/getApiOrigin';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

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

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: UserFormType['userData']) {
        setIsLoading(true);

        const { userName, userPassword: password } = data;

        try {
            const response = await fetch(`${apiOrigin}/auth/register`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, userName, password }),
            });
            const registerUser: ApiResponseType = await response.json();

            if (!response.ok) {
                throw new ApiError(registerUser.message);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

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
