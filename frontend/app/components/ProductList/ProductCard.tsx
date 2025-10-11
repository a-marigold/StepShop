'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { lockBodyScroll, unlockBodyScroll } from '@/utils/scrollLock/';

import { ClientProductType } from '@/types/ClientProductType';

import Image from 'next/image';

import ProductModal from '../ProductModal/ProductModal';

import productStyles from './ProductList.module.scss';

export default function ProductCard({
    image,
    title,
    description,
    price,
    currencySymbol,
}: ClientProductType) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal) {
            lockBodyScroll();
        }
        return () => {
            unlockBodyScroll();
        };
    }, [showModal]);

    return (
        <>
            <article
                className={productStyles['product-card']}
                onClick={() => setShowModal(true)}
                aria-label={`Добавить ${title} в корзину`}
            >
                <div className={productStyles['image-block']}>
                    <Image
                        src={image}
                        height={200}
                        width={200}
                        quality={100}
                        priority
                        alt={`Картинка товара - ${title}`}
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
                    <button
                        className={productStyles['add-button']}
                        aria-label='Открыть товар подробнее'
                    >
                        <svg
                            width={12}
                            height={12}
                            color='var(--current-color)'
                        >
                            <use href='#plus-icon' />
                        </svg>
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
                        quantity={1}
                        currencySymbol={currencySymbol}
                        setShowModal={setShowModal}
                    />,
                    document.body
                )}
        </>
    );
}
