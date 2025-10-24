'use client';

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
    const { control, handleSubmit, setError } =
        useForm<UserFormType['emailCode']>();

    const { email } = useSelector((state: RootState) => state.user.user);

    async function submit(data: UserFormType['emailCode']) {
        setIsLoading(true);

        try {
            const response = await fetch(`${apiOrigin}/auth/email/verify`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: email, code: data.emailCode }),
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

    return (
        <UserForm
            submitAction={handleSubmit(submit)}
            title='Введите код'
            description={`SMS-код был отправлен на адрес ${email}`}
            image='/images/phone-code-icon.svg'
            buttonTitle='Запросить код — через {SECONDS} сек.'
            buttonAriaLabel='Запросить код — через {SECONDS} сек.'
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
                        changeAction={field.onChange}
                        ariaLabel={`Введите код по адресу ${email}`}
                        inputQuantity={4}
                    />
                )}
            />
        </UserForm>
    );
}
