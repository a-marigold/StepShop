'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';

import EmptyFilledButton from '@/UI/EmptyFilledButton';

import errorStyles from './styles/Error.module.scss';

export default function Error({ error }: { error: Error }) {
    const router = useRouter();

    return (
        <main className={errorStyles['error-page']}>
            <div className={errorStyles['error-box']}>
                <div className={errorStyles['description-box']}>
                    <div className={errorStyles['text-block']}>
                        <h1 className={errorStyles['title']}>
                            {error.message}
                        </h1>

                        <p className={errorStyles['hint']}>
                            У вас недостаточно прав для просмотра этой страницы,
                            либо произошла непредвиденная ошибка
                        </p>
                    </div>

                    <div className={errorStyles['buttons-group']}>
                        <EmptyFilledButton
                            title='На главную'
                            ariaLabel='Вернуться на главную страницу'
                            clickAction={() => router.push('/')}
                        >
                            <svg
                                width={16}
                                height={15}
                                color='var(--accent-color)'
                            >
                                <use href='#arrow-icon' />
                            </svg>
                        </EmptyFilledButton>
                    </div>
                </div>

                <Image
                    src='/images/lock-image.svg'
                    alt=''
                    width={320}
                    height={370}
                    className={errorStyles['error-image']}
                />
            </div>
        </main>
    );
}
