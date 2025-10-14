import Header from './components/Header';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />

            {children}
        </>
    );
}
