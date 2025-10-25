'use client';

import { useState, useEffect } from 'react';

import type { ReactNode } from 'react';

import { clientGetUserData } from '@/lib/api/auth';

import Header from './components/Header';

import Navbar from './components/Navbar';

import adminStyles from './Admin.module.scss';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [error, setError] = useState<Error | null | undefined>(undefined);

    useEffect(() => {
        async function loadUser() {
            const userData = await clientGetUserData();

            if (userData.role !== 'creator' && userData.role !== 'admin') {
                setError(new Error('Доступ запрещён'));
            }
        }

        loadUser();
    }, []);

    if (error) {
        throw error;
    }

    return (
        error !== undefined && (
            <>
                <Header />

                <div className={adminStyles['main-content']}>
                    <Navbar />

                    {children}
                </div>
            </>
        )
    );
}
