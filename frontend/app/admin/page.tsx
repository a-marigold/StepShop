// TODO (8): Change page swtiching on this page on conditional CSR

import type { Metadata } from 'next';

import adminStyles from './Admin.module.scss';

export const metadata: Metadata = {
    title: 'Admin',
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return <div className={adminStyles['admin-page']}></div>;
}
