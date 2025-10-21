'use client';

import { Controller, useForm } from 'react-hook-form';

import type { UserFormType } from './UserFormType';

import { apiOrigin } from '@/utils/getApiOrigin';

import Image from 'next/image';

import PrimaryInput from '@UI/PrimaryInput';
import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

export default function PhoneNumberForm() {
    const { control, handleSubmit } = useForm<UserFormType['phoneNumber']>();

    async function submit(data: UserFormType['phoneNumber']) {
        // fetch
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className={authStyles['user-form']}
        >
            <div className={authStyles['content-block']}>
                <div className={authStyles['text-block']}>
                    <p className={authStyles['title']}>Вход в аккаунт</p>

                    <p className={authStyles['description']}>
                        Введите номер телефона, чтобы войти или
                        зарегистрироваться
                    </p>
                </div>

                <Image
                    src='/images/phone-icon.svg'
                    width={60}
                    height={60}
                    alt=''
                    priority
                />
            </div>

            <Controller
                name='phoneNumber'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <PrimaryInput
                        htmlId='phone-number-input'
                        isValid={!fieldState.error}
                        errorLabelTitle='Введите номер телефона'
                        placeholder='+X XXX XXX XX-XX'
                        inputAction={field.onChange}
                    />
                )}
            />

            <AccessButton
                title='Получить код в SMS'
                ariaLabel='Получить код в SMS'
                buttonType='submit'
                className={authStyles['access-button']}
            />
        </form>
    );
}
