'use client';

import { useState, useEffect } from 'react';

import type { ReactNode } from 'react';

import { clientGetUserData } from '@/lib/api/auth';

import Header from './components/Header';

import Navbar from './components/Navbar';

import clsx from 'clsx';
import adminStyles from './Admin.module.scss';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function loadUser() {
            setIsLoading(true);

            try {
                const userData = await clientGetUserData();

                if (userData.role !== 'creator' && userData.role !== 'admin') {
                    setError(new Error('Доступ запрещён'));
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error);
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, []);

    if (error) {
        throw error;
    }

    return isLoading ? (
        <div
            className={clsx(
                adminStyles['loading-modal'],
                !isLoading && adminStyles['hidden']
            )}
        >
            <div className={adminStyles['spinner']} />
        </div>
    ) : (
        <>
            <Header />

            <div className={adminStyles['main-content']}>
                <Navbar />

                {children}
            </div>
        </>
    );
}
