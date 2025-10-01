'use client';

import AccessButton from '@/UI/AccessButton';

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
            <div
                className={authStyles['auth-modal']}
                onClick={(event) => event.stopPropagation()}
            ></div>
        </div>
    );
}
