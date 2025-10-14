import type { Metadata } from 'next';

import Navbar from './components/Navbar';

import ControllerBox from './components/ControllerBox';

import adminStyles from './Admin.module.scss';

export const metadata: Metadata = {
    title: 'Admin',
    robots: { index: false, follow: false },
};

export default function AdminPage() {
    return (
        <div className={adminStyles['admin-page']}>
            <Navbar />
            <ControllerBox />
        </div>
    );
}
