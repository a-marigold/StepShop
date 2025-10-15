import Link from 'next/link';

import Image from 'next/image';

import { Metadata } from 'next';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import notFoundStyles from './NotFound.module.scss';

export const metadata: Metadata = {
    title: 'Страница не найдена',

    description: 'Запрошенная страница не найдена',

    openGraph: {
        title: 'Страница не найдена',
        images: [{ url: '/images/not-found-image.png' }],
    },
};

export default function NotFound() {
    return (
        <main className={notFoundStyles['not-found-page']}>
            <div className={notFoundStyles['not-found-box']}>
                <div className={notFoundStyles['text-box']}>
                    <h1 className={notFoundStyles['title']}>
                        Страница не найдена
                    </h1>
                    <p className={notFoundStyles['description']}>
                        Проверьте корректность введённого адреса или повторите
                        попытку позже
                    </p>

                    <div className={notFoundStyles['return-buttons-block']}>
                        <Link
                            href='/'
                            className={notFoundStyles['return-button']}
                        >
                            <EmptyFilledButton
                                title='На главную'
                                ariaLabel='Вернуться на главную страницу'
                                props={{ tabIndex: -1 }}
                            >
                                <svg
                                    width={16}
                                    height={15}
                                    color='var(--accent-color)'
                                >
                                    <use href='#arrow-icon' />
                                </svg>
                            </EmptyFilledButton>
                        </Link>
                    </div>
                </div>

                <Image
                    src='/images/not-found-image.svg'
                    width={340}
                    height={345}
                    alt='Страница не найдена. Код ошибки 404'
                    className={notFoundStyles['image']}
                />
            </div>
        </main>
    );
}
