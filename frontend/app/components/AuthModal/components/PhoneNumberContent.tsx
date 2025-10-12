import Image from 'next/image';

import PrimaryInput from '@UI/PrimaryInput';
import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

export default function PhoneNumberContent() {
    return (
        <>
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

            <PrimaryInput
                htmlId='phone-number-input'
                isValid={true}
                errorLabelTitle='Введите номер телефона'
                placeholder='+X XXX XXX XX-XX'
            />

            <AccessButton
                title='Получить код в SMS'
                ariaLabel='Получить код в SMS'
                className={authStyles['access-button']}
            />
        </>
    );
}
