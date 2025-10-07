import type { Metadata } from 'next';

import Header from './components/Header';
import Providers from './providers';

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
                {/* TODO: Group this svg elements to <SvgSprites/> component */}
                {/* svg loading icons for <use/> */}
                <svg style={{ display: 'none' }}>
                    <symbol id='profile-icon' viewBox='0 0 12 16' fill='none'>
                        <path
                            d='M11.5706 14.2087V12.8198C11.5706 12.0831 11.2921 11.3765 10.7966 10.8556C10.301 10.3347 9.6288 10.042 8.92793 10.042H3.64264C2.94177 10.042 2.2696 10.3347 1.77401 10.8556C1.27842 11.3765 1 12.0831 1 12.8198V14.2087'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M6.28522 7.26405C7.74471 7.26405 8.92787 6.0204 8.92787 4.48627C8.92787 2.95215 7.74471 1.7085 6.28522 1.7085C4.82573 1.7085 3.64258 2.95215 3.64258 4.48627C3.64258 6.0204 4.82573 7.26405 6.28522 7.26405Z'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </symbol>

                    <symbol id='plus-icon' viewBox='0 0 13 12' fill='none'>
                        <path
                            d='M12.0536 5.25H7.23214V0.75C7.23214 0.551088 7.14748 0.360322 6.99678 0.21967C6.84608 0.0790178 6.64169 0 6.42857 0C6.21545 0 6.01106 0.0790178 5.86036 0.21967C5.70966 0.360322 5.625 0.551088 5.625 0.75V5.25H0.803571C0.590451 5.25 0.38606 5.32902 0.235361 5.46967C0.0846619 5.61032 0 5.80109 0 6C0 6.19891 0.0846619 6.38968 0.235361 6.53033C0.38606 6.67098 0.590451 6.75 0.803571 6.75H5.625V11.25C5.625 11.4489 5.70966 11.6397 5.86036 11.7803C6.01106 11.921 6.21545 12 6.42857 12C6.64169 12 6.84608 11.921 6.99678 11.7803C7.14748 11.6397 7.23214 11.4489 7.23214 11.25V6.75H12.0536C12.2667 6.75 12.4711 6.67098 12.6218 6.53033C12.7725 6.38968 12.8571 6.19891 12.8571 6C12.8571 5.80109 12.7725 5.61032 12.6218 5.46967C12.4711 5.32902 12.2667 5.25 12.0536 5.25Z'
                            fill='currentColor'
                        />
                    </symbol>
                </svg>

                {/* <svg width={12} height={12} color='var(--accent-color)'>
                    <use href='#plus-icon'></use>
                </svg> */}
                {/*  */}

                <Providers>
                    <Header></Header>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
