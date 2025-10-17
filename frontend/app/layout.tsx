import type { Metadata } from 'next';

import Providers from './providers';
import NoticesList from '@/components/NoticesList';

import SvgSprites from '@UI/SvgSprites';

import './globals.scss';

export const metadata: Metadata = {
    metadataBase: new URL('https://step-shop.netlify.app'),
    icons: {
        icon: [
            { url: '/images/website-icon.png' },
            { url: '/images/website-icon.png', rel: 'apple-touch-icon' },
        ],
    },
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
                <SvgSprites /> {/* svg sprites loading */}
                <Providers>
                    {/* <Header></Header> */}

                    {children}

                    <NoticesList />
                </Providers>
            </body>
        </html>
    );
}
