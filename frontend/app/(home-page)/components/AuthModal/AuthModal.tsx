// TODO (8): Add authorization logic

'use client';

import PhoneNumberForm from './components/PhoneNumberForm';
import PhoneCodeForm from './components/PhoneCodeForm';

import ModalBackdrop from '@/UI/ModalBackdrop';
import CloseModalCross from '@/UI/CloseModalCross';

import authStyles from './AuthModal.module.scss';

interface AuthModalProps {
    setShowModal: (showModal: boolean) => void;
}

export default function AuthModal({ setShowModal }: AuthModalProps) {
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
                    <PhoneNumberForm />
                    {/* <PhoneCodeContent /> */}
                </div>

                <CloseModalCross
                    crossColor='white'
                    clickAction={() => setShowModal(false)}
                />
            </div>
        </ModalBackdrop>
    );
}
