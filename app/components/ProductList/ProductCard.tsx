'use client';

import { useState } from 'react';

import { createPortal } from 'react-dom';

import type { ProductType } from '@/types/ProductTypes';

import Image from 'next/image';

import ProductModal from '../ProductModal/ProductModal';

import productStyles from './ProductList.module.scss';

export default function ProductCard({
    image,
    title,
    description,
    price,
    currencySymbol,
}: ProductType) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <article
                className={productStyles['product-card']}
                onClick={() => setShowModal(true)}
            >
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

            {showModal &&
                createPortal(
                    <ProductModal
                        title={title}
                        image={image}
                        description={description}
                        price={price}
                        currencySymbol={currencySymbol}
                        setShowModal={setShowModal}
                    />,
                    document.body
                )}
        </>
    );
}
