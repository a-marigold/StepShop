// TODO (1): Add authorization logic

'use client';

import PhoneNumberContent from './components/PhoneNumberContent';
import PhoneCodeContent from './components/PhoneCodeContent';

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
                    <PhoneNumberContent />
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
