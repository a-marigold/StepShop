import type { ReactNode } from 'react';
import { cookies } from 'next/headers';

import { serverGetUserData } from '@/lib/api/auth';

import Header from './components/Header';
import Navbar from './components/Navbar';

import adminStyles from './Admin.module.scss';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const cookieStore = await cookies();

    const token = cookieStore.get('token')?.value;

    // if (!token) {
    //     throw new Error('Доступ запрещён');
    // }

    // const userData = await serverGetUserData(
    //     token,
    //     new Error('Доступ запрещён')
    // );
    // if (userData.role !== 'creator' && userData.role !== 'admin') {
    //     throw new Error('Доступ запрещён');
    // }

    return (
        <>
            <Header />

            <div className={adminStyles['main-content']}>
                <Navbar />
                {children}
            </div>
        </>
    );
}
