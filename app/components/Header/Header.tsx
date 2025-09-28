import Link from 'next/link';

import SearchInput from './SearchInput';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import headerStyles from './Header.module.scss';

export default function Header() {
    return (
        <header className={headerStyles['header']}>
            <div className={headerStyles['left-box']}>
                <div className={headerStyles['title-block']}>
                    <Link href='/'>
                        <img src='/images/pizza-icon.svg' alt='Logo' />
                    </Link>

                    <div className={headerStyles['title-text']}>
                        <Link href='/' className={headerStyles['title']}>
                            NEXT PIZZA
                        </Link>
                        <p className={headerStyles['title-slogan']}>
                            вкусней уже некуда
                        </p>
                    </div>
                </div>

                <SearchInput />
            </div>

            <div className={headerStyles['user-buttons-block']}>
                <EmptyFilledButton
                    title='Войти'
                    ariaLabel='Войти в аккаунт'
                    classNames={[headerStyles['profile-button']]}
                    imageSettings={{ imageUrl: '/images/profile-icon.svg' }}
                />

                <EmptyFilledButton
                    ariaLabel='Открыть корзину'
                    classNames={[headerStyles['cart-button']]}
                    imageSettings={{ imageUrl: '/images/cart-icon.svg' }}
                />
            </div>
        </header>
    );
}
