import type { ReactNode } from 'react';

import Header from '@/components/Header';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header excludeChildren={['cart-button', 'search-block']} />
            {children}
        </>
    );
}
