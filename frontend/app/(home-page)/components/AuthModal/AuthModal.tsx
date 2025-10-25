// TODO (8): Add authorization logic

// TODO (5): Add zod scheme

'use client';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import { EmailForm, EmailCodeForm, UserDataForm } from './components';

import ModalBackdrop from '@/UI/ModalBackdrop';
import CloseModalCross from '@/UI/CloseModalCross';

import authStyles from './AuthModal.module.scss';

interface AuthModalProps {
    setShowModal: (showModal: boolean) => void;
}

export default function AuthModal({ setShowModal }: AuthModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const authStep = useSelector((state: RootState) => state.user.authStep);

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
                    {isLoading && (
                        <div className={authStyles['loading-wrapper']}>
                            <div className={authStyles['loading-spinner']} />
                        </div>
                    )}
                    {authStep === 1 && (
                        <EmailForm
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    )}

                    {authStep === 2 && (
                        <EmailCodeForm
                            setShowModal={setShowModal}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    )}

                    {authStep === 3 && (
                        <UserDataForm
                            setShowModal={setShowModal}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    )}
                </div>

                <CloseModalCross
                    clickAction={() => setShowModal(false)}
                    className={authStyles['close-modal-button']}
                />
            </div>
        </ModalBackdrop>
    );
}
