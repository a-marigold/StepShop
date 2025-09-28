import Link from 'next/link';
import Image from 'next/image';

import { Metadata } from 'next';

import EmptyFilledButton from '@UI/EmptyFilledButton';

import notFoundStyles from './NotFound.module.scss';

export const metadata: Metadata = {
    title: 'Страница не найдена',
    openGraph: {
        title: 'Страница не найдена',
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
                        <EmptyFilledButton
                            title='На главную'
                            imageSettings={{
                                imageUrl: '/images/arrow-left.svg',
                            }}
                            ariaLabel='Вернуться на главную страницу'
                        />
                    </div>
                </div>

                <Image
                    src='/images/not-found-image.svg'
                    width={340}
                    height={345}
                    alt='Page is not found. Error message 404'
                />
            </div>
        </main>
    );
}
