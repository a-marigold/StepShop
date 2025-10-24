'use client';

import { Controller, useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { increaseAuthStep, decreaseCodeTime, resetCodeTime } from '../redux';

import { useCountDown } from '@/hooks';

import ApiError from '@/utils/errors/ApiError';
import { sendEmail, verifyCode } from '@/lib/api/auth';

import type { UserFormProps, UserFormType } from './UserFormTypes';

import UserForm from './UserForm';
import CodeInput from '@UI/CodeInput';

export function EmailCodeForm({ isLoading, setIsLoading }: UserFormProps) {
    const { control, setError, getValues } =
        useForm<UserFormType['emailCode']>();

    const { email } = useSelector((state: RootState) => state.user.user);
    const codeTime = useSelector((state: RootState) => state.user.codeTime);
    const dispatch = useDispatch<AppDispatch>();

    async function verifyCodeSubmit() {
        const emailCode = getValues('emailCode');

        if (emailCode?.length < 4) return;

        setIsLoading(true);

        try {
            const verifyCodeData = await verifyCode(email, emailCode);

            dispatch(increaseAuthStep());
        } catch (error) {
            if (error instanceof ApiError) {
                setError('emailCode', {
                    type: 'server',

                    message: error.message,
                });
            }
        } finally {
            setIsLoading(false);
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

    const countedTime = useCountDown(codeTime, () =>
        dispatch(decreaseCodeTime())
    );

    return (
        <UserForm
            submitAction={sendEmailSubmit}
            title='Введите код'
            description={`SMS-код был отправлен на адрес ${email}`}
            image='/images/phone-code-icon.svg'
            buttonTitle={
                countedTime !== 0
                    ? `Запросить код — через ${countedTime} сек.`
                    : 'Запросить код'
            }
            buttonAriaLabel={
                countedTime !== 0
                    ? `Запросить код — через ${countedTime} сек.`
                    : 'Запросить код'
            }
            isLoading={isLoading}
            buttonDisabled={!!(countedTime > 0)}
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

                            if (field?.value?.length === 3) {
                                verifyCodeSubmit();
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
