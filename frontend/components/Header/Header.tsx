import Link from 'next/link';

import SearchBlock from './components/SearchBlock';
import UserButtons from './components/UserButtons';

import headerStyles from './Header.module.scss';

export default function Header() {
    return (
        <header className={headerStyles['header']}>
            <div className={headerStyles['left-box']}>
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

                <SearchBlock />
            </div>

            <UserButtons />
        </header>
    );
}
