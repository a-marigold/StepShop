// TODO (8): Add authorization logic

'use client';

import { useState } from 'react';

import { EmailForm, EmailCodeForm, UserDataForm } from './components';

import ModalBackdrop from '@/UI/ModalBackdrop';
import CloseModalCross from '@/UI/CloseModalCross';

import authStyles from './AuthModal.module.scss';

interface AuthModalProps {
    setShowModal: (showModal: boolean) => void;
}

export default function AuthModal({ setShowModal }: AuthModalProps) {
    const [authStep, setAuthStep] = useState(1);

    return (
        <ModalBackdrop
            props={{ className: authStyles['modal-backdrop'] }}
            setShowModal={setShowModal}
        >
            <div className={authStyles['modal-wrapper']}>
                <div
                    className={authStyles['auth-modal']}
                    onClick={(event) => event.stopPropagation()}
                >
                    {authStep === 1 && <EmailForm setAuthStep={setAuthStep} />}
                    {authStep === 2 && (
                        <EmailCodeForm setAuthStep={setAuthStep} />
                    )}
                    {authStep === 3 && <UserDataForm />}
                </div>

                <CloseModalCross
                    clickAction={() => setShowModal(false)}
                    className={authStyles['close-modal-button']}
                />
            </div>
        </ModalBackdrop>
    );
}
