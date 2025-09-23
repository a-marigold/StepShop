import SearchInput from './SearchInput';

import headerStyles from './Header.module.scss';

export default function Header() {
    return (
        <header className={headerStyles['header']}>
            <div className={headerStyles['title-block']}>
                <img src='/images/pizza-icon.svg' alt='Logo' />

                <div className={headerStyles['title-text']}>
                    <h1>NEXT PIZZA</h1>
                    <p>вкусней уже некуда </p>
                </div>
            </div>

            <SearchInput />

            <div className={headerStyles['user-buttons-block']}>
                <button className={headerStyles['user-button']}>Войти</button>
                <button className={headerStyles['user-button']}></button>
            </div>
        </header>
    );
}
