import type { ReactNode } from 'react';

import Header from './components/Header';
import Navbar from './components/Navbar';

import adminStyles from './Admin.module.scss';

export default function AdminLayout({ children }: { children: ReactNode }) {
    if (0 === 0) {
        throw new Error('Доступ запрещён');
    }

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
