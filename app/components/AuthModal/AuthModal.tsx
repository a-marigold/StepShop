'use client';

import AuthContent from './components/AuthContent';

import CloseModalCross from '@/UI/CloseModalCross';
import PrimaryInput from '@UI/PrimaryInput';

import authStyles from './AuthModal.module.scss';

interface AuthModalProps {
    setShowModal: (showModal: boolean) => void;
}
export default function AuthModal({ setShowModal }: AuthModalProps) {
    return (
        <div
            className={authStyles['modal-backdrop']}
            onClick={() => setShowModal(false)}
        >
            <div className={authStyles['modal-wrapper']}>
                <div
                    className={authStyles['auth-modal']}
                    onClick={(event) => event.stopPropagation()}
                >
                    <AuthContent
                        title='Вход в аккаунт'
                        description='Введите номер телефона, чтобы войти или зарегистрироваться'
                        image='/images/phone-icon.svg'
                        buttonTitle='Получить код в SMS'
                    >
                        <PrimaryInput
                            htmlId='phone-number-input'
                            isValid={false}
                            title='Номер телефона'
                            errorLabelTitle='Введите номер телефона'
                        />
                    </AuthContent>
                </div>

                <CloseModalCross clickAction={() => setShowModal(false)} />
            </div>
        </div>
    );
}
