// TODO (2): Add separate function for excludeChildren

import Link from 'next/link';

import type { HeaderChild } from './HeaderChild';

import SearchBlock from './components/SearchBlock';
import UserButtons from './components/UserButtons';

import headerStyles from './Header.module.scss';

interface HeaderProps {
    excludeChildren?: HeaderChild[];
}

export default function Header({ excludeChildren }: HeaderProps) {
    function checkChildIncluding(childName: HeaderChild) {
        return !excludeChildren?.includes(childName);
    }

    return (
        <header className={headerStyles['header']}>
            <div className={headerStyles['left-box']}>
                {checkChildIncluding('title-block') && (
                    <div className={headerStyles['title-block']}>
                        <Link href='/'>
                            <img
                                src='/images/website-icon.png'
                                alt='Логотип Step Shop'
                                width={35}
                                height={35}
                                className={headerStyles['website-icon']}
                            />
                        </Link>

                        <div className={headerStyles['title-text']}>
                            <Link href='/' className={headerStyles['title']}>
                                STEP SHOP
                            </Link>

                            <p className={headerStyles['title-slogan']}>
                                товары на любой вкус
                            </p>
                        </div>
                    </div>
                )}
                {checkChildIncluding('title-block') && <SearchBlock />}
            </div>

            <UserButtons
                excludeProfileButton={checkChildIncluding('profile-button')}
                excludeCartButton={checkChildIncluding('cart-button')}
            />
        </header>
    );
}
