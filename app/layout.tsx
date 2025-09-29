import type { Metadata } from 'next';

import Header from './components/Header';
import ReduxWrapper from '@/redux/ReduxWrapper';

import './globals.scss';

export const metadata: Metadata = {
    metadataBase: new URL('https://step-shop.netlify.app'),
    title: {
        default: 'StepShop',
        template: '%s | StepShop',
    },
    openGraph: {
        images: [{ url: './icon.png' }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <ReduxWrapper>
                    <Header></Header>
                    {children}
                </ReduxWrapper>
            </body>
        </html>
    );
}
