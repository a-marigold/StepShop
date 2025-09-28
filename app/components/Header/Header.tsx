import Link from 'next/link';

import SearchInput from './SearchInput';
import UserButtons from './UserButtons';

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

            <UserButtons />
        </header>
    );
}
