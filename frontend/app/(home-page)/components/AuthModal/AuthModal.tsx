// TODO (8): Add authorization logic

'use client';

import { useState } from 'react';

import { PhoneNumberForm, PhoneCodeForm, UserDataForm } from './components';

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
                    {authStep === 1 && (
                        <PhoneNumberForm setAuthStep={setAuthStep} />
                    )}
                    {authStep === 2 && (
                        <PhoneCodeForm setAuthStep={setAuthStep} />
                    )}
                    {authStep === 3 && <UserDataForm />}
                </div>

                <CloseModalCross
                    crossColor='white'
                    clickAction={() => setShowModal(false)}
                />
            </div>
        </ModalBackdrop>
    );
}
