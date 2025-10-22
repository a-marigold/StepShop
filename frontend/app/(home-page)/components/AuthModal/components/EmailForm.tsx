// TODO (5): Enable JSON scheme for this form

'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';
import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type { UserFormType, UserFormProps } from './UserFormType';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { addErrorNotice, addSuccessNotice } from '@/utils/noticeGlobalState';

import type { UserType } from '@shared/types/UserTypes';

import UserForm from './UserForm';
import PrimaryInput from '@UI/PrimaryInput';

export function EmailForm({ setAuthStep }: UserFormProps) {
    const { control, handleSubmit } = useForm<UserFormType['email']>();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: { email: string }) {
        try {
            const response = await fetch(`${apiOrigin}/auth/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const sendEmail: ApiResponseType = await response.json();

            if (!response.ok) {
                throw new ApiError(sendEmail.message);
            }

            addSuccessNotice('Email was sent', sendEmail.message, 10, dispatch);

            setAuthStep((authStep) => authStep + 1);
        } catch (error) {
            if (error instanceof ApiError) {
                addErrorNotice('ERROR', error.message, 10, dispatch);
            }
        }
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
