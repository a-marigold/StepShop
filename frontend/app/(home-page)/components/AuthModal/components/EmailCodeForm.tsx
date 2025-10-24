'use client';

import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';
import { apiOrigin } from '@/utils/getApiOrigin';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import type { UserFormProps, UserFormType } from './UserFormTypes';

import UserForm from './UserForm';
import CodeInput from '@UI/CodeInput';

export function EmailCodeForm({
    setAuthStep,
    isLoading,
    setIsLoading,
}: UserFormProps) {
    const { control, setError, getValues } =
        useForm<UserFormType['emailCode']>();

    const { email } = useSelector((state: RootState) => state.user.user);

    async function verifyCode() {
        const emailCode = getValues('emailCode');

        if (emailCode?.length < 4) return;

        setIsLoading(true);

        try {
            const response = await fetch(`${apiOrigin}/auth/email/verify`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: email, code: emailCode }),
            });

            const verifyData: ApiResponseType = await response.json();

            if (!response.ok) {
                throw new ApiError(verifyData.message);
            }

            if (setAuthStep) {
                setAuthStep((authStep) => authStep + 1);
                setIsLoading(false);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setIsLoading(false);

                setError('emailCode', {
                    type: 'server',

                    message: error.message,
                });
            }
        }
    }

    async function sendEmail(event: Event) {
        event.preventDefault();

        try {
            const response = await fetch(`${apiOrigin}/auth/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });
            const sendEmail: ApiResponseType = await response.json();

            if (!response.ok) {
                throw new ApiError(sendEmail.message);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setError('emailCode', {
                    type: 'server',
                    message: error.message,
                });
            }
        }
    }

    const [codeTime, setCodeTime] = useState(32);

    useEffect(() => {
        const countDown = setInterval(() => {
            setCodeTime((prev) => prev - 1);
        }, 1000);

        if (codeTime < 1) {
            clearInterval(countDown);
        }

        return () => {
            clearInterval(countDown);
        };
    }, [codeTime]);

    return (
        <UserForm
            submitAction={sendEmail}
            title='Введите код'
            description={`SMS-код был отправлен на адрес ${email}`}
            image='/images/phone-code-icon.svg'
            buttonTitle={
                codeTime !== 0
                    ? `Запросить код — через ${codeTime} сек.`
                    : 'Запросить код'
            }
            buttonAriaLabel={
                codeTime !== 0
                    ? `Запросить код — через ${codeTime} сек.`
                    : 'Запросить код'
            }
            isLoading={isLoading}
        >
            <Controller
                name='emailCode'
                control={control}
                rules={{
                    required: `Введите код по адресу ${email}`,
                    minLength: { value: 4, message: '' },
                }}
                render={({ field, fieldState }) => (
                    <CodeInput
                        htmlId='code-input'
                        isValid={!fieldState.invalid}
                        errorLabelTitle={
                            fieldState.error?.message ??
                            `Введите код по адресу${email}`
                        }
                        changeAction={(value) => {
                            field.onChange(value);

                            console.log(value);

                            if (field?.value?.length === 3) {
                                verifyCode();
                            }
                        }}
                        ariaLabel={`Введите код по адресу ${email}`}
                        inputQuantity={4}
                    />
                )}
            />
        </UserForm>
    );
}
