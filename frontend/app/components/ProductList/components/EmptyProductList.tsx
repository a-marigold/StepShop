import Image from 'next/image';

import emptyStyles from './EmptyProductsList.module.scss';

export default function EmptyProductList() {
    return (
        <div className={emptyStyles['empty-list-box']}>
            <div className={emptyStyles['text-block']}>
                <h2 className={emptyStyles['title']}>Товары не найдены</h2>

                <p className={emptyStyles['message']}>
                    Ни один товар не подошёл под фильтры
                </p>
            </div>

            <Image
                src='/images/not-found-image.svg'
                alt='Код ошибки 404'
                width={340}
                height={345}
                priority
                fetchPriority='high'
                className={emptyStyles['image']}
            />
        </div>
    );
}
