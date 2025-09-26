import Image from 'next/image';

// import type { ProductType } from './ProductType';

import AccesButton from '@/UI/AccessButton';

import modalStyles from './ProductModal.module.scss';

export default function ProductCard() {
    return (
        <div>
            <div className={modalStyles['image-block']}>
                <Image
                    src={'/images/'}
                    width={200}
                    height={200}
                    alt='Product image'
                />
            </div>

            <div className={modalStyles['acces-block']}>
                <div className={modalStyles['text-block']}>
                    <p className={modalStyles['title']}></p>
                    <p className={modalStyles['description']}></p>
                </div>

                {/* SIZE PICKER COMPONENT */}

                <AccesButton
                    title={'Добавить в корзину за /* ЦЕНА */'}
                    classNames={[modalStyles['acces-button']]}
                    ariaLabel={'Добавить товар в корзину за /* ЦЕНА */'}
                />
            </div>
        </div>
    );
}
