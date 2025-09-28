import Link from 'next/link';
import Image from 'next/image';

import homeStyles from './Home.module.scss';

export default function NotFound() {
    return (
        <main className={homeStyles['not-found-page']}>
            <div className={homeStyles['not-found-box']}>
                <div className={homeStyles['not-found-text-box']}>
                    <h1>Страница не найдена</h1>
                    <p>
                        Проверьте корректность введённого адреса или повторите
                        попытку позже
                    </p>

                    <div className={homeStyles['return-buttons-block']}></div>
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
