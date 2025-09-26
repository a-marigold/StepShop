import Image from 'next/image';

import type { ProductType } from './ProductType';

import productStyles from './ProductList.module.scss';

export default function ProductCard({
    image,
    title,
    description,
    price,
    currencySymbol,
}: ProductType) {
    return (
        <article className={productStyles['product-card']}>
            <div className={productStyles['image-block']}>
                <Image
                    src={image}
                    height={200}
                    width={200}
                    alt='Product image'
                />
            </div>

            <div className={productStyles['description-block']}>
                <p className={productStyles['title']}>{title}</p>
                {description && (
                    <p className={productStyles['description']}>
                        {description}
                    </p>
                )}
            </div>

            <div className={productStyles['order-block']}>
                <p className={productStyles['price']}>
                    от&nbsp;
                    <span className={productStyles['highlighted']}>
                        {price}&nbsp;
                        {currencySymbol}
                    </span>
                </p>
                <button className={productStyles['add-button']}>
                    <img src='/images/plus-icon.svg' alt='' />
                    Добавить
                </button>
            </div>
        </article>
    );
}
