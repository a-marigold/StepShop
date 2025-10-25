import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock';

import ApiError from '@/utils/errors/ApiError';
import { getUserData } from '@/lib/api/auth';

import type { UserType } from '@shared/types/UserTypes';

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

    const [user, setUser] = useState<UserType | null>();

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await getUserData();

                setUser(userData);
            } catch (error) {
                if (error instanceof ApiError) {
                    setUser(null);
                }
            }
        }

        loadUser();
    }, []);

    return (
        <>
            {!!user ? (
                <EmptyFilledButton
                    title={user.userName}
                    ariaLabel='Открыть профиль'
                    className={userStyles['profile-button']}
                >
                    <svg width={12} height={16} color='var(--accent-color)'>
                        <use href='#profile-icon' />
                    </svg>
                </EmptyFilledButton>
            ) : (
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
            )}

            {showAuthModal &&
                createPortal(
                    <AuthModal setShowModal={setShowAuthModal} />,

                    document.body
                )}
        </>
    );
}
