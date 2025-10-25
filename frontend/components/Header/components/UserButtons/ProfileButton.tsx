import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import AuthModal from '@/app/(home-page)/components/AuthModal';

import EmptyFilledButton from '@/UI/EmptyFilledButton';

import userStyles from './UserButtons.module.scss';

export default function ProfileButton() {
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (showAuthModal) {
            lockBodyScroll();
        }

        return () => {
            unlockBodyScroll();
        };
    }, [showAuthModal]);

    return (
        <>
            <EmptyFilledButton
                title='Войти'
                ariaLabel='Войти в аккаунт'
                className={userStyles['profile-button']}
                clickAction={() => setShowAuthModal(true)}
            >
                <svg width={12} height={16} color='var(--accent-color)'>
                    <use href='#profile-icon' />
                </svg>
            </EmptyFilledButton>

            {showAuthModal &&
                createPortal(
                    <AuthModal setShowModal={setShowAuthModal} />,

                    document.body
                )}
        </>
    );
}
