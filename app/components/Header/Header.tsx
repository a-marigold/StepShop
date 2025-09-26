import Link from 'next/link';

import SearchInput from './SearchInput';

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

            <div
                aria-label='Log in account'
                className={headerStyles['user-buttons-block']}
            >
                <button className={headerStyles['user-button']}>
                    <svg
                        width='13'
                        height='15'
                        viewBox='0 0 13 15'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M11.5706 14.2087V12.8198C11.5706 12.0831 11.2921 11.3765 10.7966 10.8556C10.301 10.3347 9.6288 10.042 8.92793 10.042H3.64264C2.94177 10.042 2.2696 10.3347 1.77401 10.8556C1.27842 11.3765 1 12.0831 1 12.8198V14.2087'
                            stroke='#FE5F00'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M6.28522 7.26405C7.74471 7.26405 8.92787 6.0204 8.92787 4.48627C8.92787 2.95215 7.74471 1.7085 6.28522 1.7085C4.82573 1.7085 3.64258 2.95215 3.64258 4.48627C3.64258 6.0204 4.82573 7.26405 6.28522 7.26405Z'
                            stroke='#FE5F00'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>

                    <span>Войти</span>
                </button>

                <button
                    aria-label='Open cart'
                    className={`${headerStyles['user-button']} ${headerStyles['cart-button']}`}
                >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M6.33333 16.3332C7.06971 16.3332 7.66667 15.7362 7.66667 14.9998C7.66667 14.2635 7.06971 13.6665 6.33333 13.6665C5.59695 13.6665 5 14.2635 5 14.9998C5 15.7362 5.59695 16.3332 6.33333 16.3332Z'
                            stroke='#FE5F00'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M14.3333 16.3332C15.0697 16.3332 15.6667 15.7362 15.6667 14.9998C15.6667 14.2635 15.0697 13.6665 14.3333 13.6665C13.597 13.6665 13 14.2635 13 14.9998C13 15.7362 13.597 16.3332 14.3333 16.3332Z'
                            stroke='#FE5F00'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                        <path
                            d='M4.77984 4.99984H16.3332L15.2132 10.5932C15.1522 10.9001 14.9852 11.1758 14.7415 11.372C14.4977 11.5683 14.1927 11.6725 13.8798 11.6665H6.83317C6.50763 11.6693 6.19232 11.5528 5.94671 11.3391C5.70109 11.1255 5.54215 10.8293 5.49984 10.5065L4.4865 2.8265C4.44448 2.50599 4.28745 2.21167 4.04464 1.99828C3.80182 1.7849 3.48976 1.66699 3.1665 1.6665H1.6665'
                            stroke='#FE5F00'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
}
