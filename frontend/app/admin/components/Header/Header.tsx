import Link from 'next/link';

import EmptyFilledButton from '@/UI/EmptyFilledButton';

import headerStyles from './Header.module.scss';

export default function Header() {
    return (
        <header className={headerStyles['header']}>
            <Link href={'/'} className={headerStyles['back-link']}>
                <EmptyFilledButton
                    title='На главную'
                    ariaLabel='Вернуться на главную страницу'
                    props={{ tabIndex: -1 }}
                >
                    <svg width={16} height={16} color='var(--accent-color)'>
                        <use href='#arrow-icon' />
                    </svg>
                </EmptyFilledButton>
            </Link>
        </header>
    );
}
