// TODO (5): Enable JSON scheme for this form

'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';
import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type { UserFormType, UserFormProps } from './UserFormTypes';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { increaseAuthStep } from '../redux';

import { setUser } from '../redux';

import UserForm from './UserForm';
import PrimaryInput from '@UI/PrimaryInput';

export function EmailForm({ isLoading, setIsLoading }: UserFormProps) {
    const { control, handleSubmit, setError } =
        useForm<UserFormType['email']>();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: { email: string }) {
        setIsLoading(true);

        const { email } = data;

        const prepareData = { email: email.trim() };

        try {
            const response = await fetch(`${apiOrigin}/auth/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prepareData),
            });
            const sendEmail: ApiResponseType = await response.json();

            if (!response.ok) {
                throw new ApiError(sendEmail.message);
            }

            dispatch(setUser({ email: prepareData.email }));

            dispatch(increaseAuthStep());
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            if (error instanceof ApiError) {
                setError('email', { type: 'server', message: error.message });
            }
        }
    }

    // TODO (5): Add zod scheme
    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Вход в аккаунт'
            description='Введите адрес электронной почты, чтобы войти или зарегистрироваться'
            image='/images/phone-icon.svg'
            buttonTitle='Получить код на email'
            buttonAriaLabel='Получить код на email'
            isLoading={isLoading}
        >
            <Controller
                name='email'
                control={control}
                rules={{ required: 'Введите адрес электронной почты' }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='email-input'
                        isValid={!fieldState.error}
                        errorLabelTitle={
                            fieldState.error?.message ??
                            `Введите адрес электронной почты`
                        }
                        placeholder='example@gmail.com'
                        inputAction={field.onChange}
                    />
                )}
            />
        </UserForm>
    );
}
