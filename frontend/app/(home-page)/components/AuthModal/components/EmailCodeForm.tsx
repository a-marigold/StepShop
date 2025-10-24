'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { increaseAuthStep, decreaseCodeTime, resetCodeTime } from '../redux';

import ApiError from '@/utils/errors/ApiError';
import { sendEmail, verifyEmailCode } from '@/lib/api/auth';

import type { UserFormProps, UserFormType } from './UserFormTypes';

import UserForm from './UserForm';
import CodeInput from '@UI/CodeInput';

export function EmailCodeForm({ isLoading, setIsLoading }: UserFormProps) {
    const { control, setError, getValues } =
        useForm<UserFormType['emailCode']>();

    const { email } = useSelector((state: RootState) => state.user.user);
    const codeTime = useSelector((state: RootState) => state.user.codeTime);
    const dispatch = useDispatch<AppDispatch>();

    async function verifyCode() {
        const emailCode = getValues('emailCode');

        if (emailCode?.length < 4) return;

        setIsLoading(true);

        try {
            const verifyCodeData = await verifyEmailCode(email, emailCode);

            dispatch(increaseAuthStep());

            setIsLoading(false);
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

    async function sendEmailSubmit(event: Event) {
        if (codeTime !== 0) return;

        event.preventDefault();

        try {
            const sendEmailData = await sendEmail(email);
        } catch (error) {
            if (error instanceof ApiError) {
                setError('emailCode', {
                    type: 'server',
                    message: error.message,
                });
            }
        }

        dispatch(resetCodeTime());
    }

    // TODO: Take it out in a separate util:
    useEffect(() => {
        const countDown = setInterval(() => {
            dispatch(decreaseCodeTime());
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
            submitAction={sendEmailSubmit}
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
            buttonDisabled={!!(codeTime > 0)}
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
