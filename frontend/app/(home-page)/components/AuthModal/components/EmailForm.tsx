// TODO (5): Enable JSON scheme for this form

'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { increaseAuthStep } from '../redux';

import ApiError from '@/utils/errors/ApiError';
// import { apiOrigin } from '@/utils/getApiOrigin';
// import type { ApiResponseType } from '@shared/types/ApiResponseType';

import { sendEmail } from '@/lib/api/auth';

import type { UserFormType, UserFormProps } from './UserFormTypes';

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

        try {
            const data = await sendEmail(email);

            dispatch(setUser({ email: email.trim() }));

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
