import PrimaryInput from '@UI/PrimaryInput';
import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

export default function PhoneCodeContent() {
    return (
        <>
            <div className={authStyles['content-block']}>
                <div className={authStyles['text-block']}>
                    <p className={authStyles['title']}>Введите код</p>

                    <p className={authStyles['description']}>
                        SMS-код был отправлен на номер телефона +7 (921)
                        450-20-25
                    </p>
                </div>

                <img
                    src='/images/phone-icon.svg'
                    width={60}
                    height={60}
                    alt=''
                />
            </div>

            <PrimaryInput
                htmlId='phone-number-input'
                isValid={true}
                errorLabelTitle='Введите номер телефона'
                placeholder='+X XXX XXX XX-XX'
            />

            <AccessButton
                title='Запросить код — через {SECONDS} сек.'
                ariaLabel='Запросить код — через {SECONDS} сек.'
                className={authStyles['access-button']}
            />
        </>
    );
}
