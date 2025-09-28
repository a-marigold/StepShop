import type { Metadata } from 'next';

import Header from './components/Header/Header';

import './globals.scss';

export const metadata: Metadata = {
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
                <Header></Header>
                {children}
            </body>
        </html>
    );
}
