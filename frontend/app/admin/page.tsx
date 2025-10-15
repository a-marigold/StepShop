import type { Metadata } from 'next';

import OperationPage from './[operation]/page';

import Navbar from './components/Navbar';

import adminStyles from './Admin.module.scss';

export const metadata: Metadata = {
    title: 'Admin',
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return <div className={adminStyles['admin-page']}></div>;
}
