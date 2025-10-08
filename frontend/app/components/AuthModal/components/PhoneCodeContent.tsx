import CodeInput from '@UI/CodeInput';
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
                    src='/images/phone-code-icon.svg'
                    width={60}
                    height={60}
                    alt=''
                />
            </div>

            <CodeInput ariaLabel='Введите код из SMS' inputQuantity={4} />

            <AccessButton
                title='Запросить код — через {SECONDS} сек.'
                ariaLabel='Запросить код — через {SECONDS} сек.'
                className={authStyles['access-button']}
            />
        </>
    );
}
