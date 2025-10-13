'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Ref } from 'react';

import type { ProductType } from '@shared/types/ProductTypes';

import Image from 'next/image';

import ModalBackdrop from '@UI/ModalBackdrop';

import modalStyles from './SearchModal.module.scss';
import { CURRENCY_SYMBOL } from '@/constants/currency';

type SearchProductType = Pick<ProductType, 'id' | 'image' | 'title' | 'price'>;

interface SearchModalProps {
    ref: Ref<HTMLDivElement>;

    searchQuery: string;

    setShowModal: (showModal: boolean) => void;
}
export default function SearchModal({
    ref,
    searchQuery,
    setShowModal,
}: SearchModalProps) {
    const [products, setProducts] = useState<SearchProductType[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:1000/products')
            .then((data) => data.json())
            .then((data) => setProducts(data))

            .catch((error) => {
                console.error(error);
                setProducts([]);
            });

        console.log(products);
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <ModalBackdrop setShowModal={setShowModal}>
            <div
                ref={ref}
                className={modalStyles['search-modal']}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {searchQuery.trim() && !!filteredProducts.length ? (
                    filteredProducts.map((product) => (
                        <a
                            key={product.id}
                            href={`#${product.title}`}
                            className={modalStyles['search-product']}
                        >
                            <Image
                                src={product.image}
                                alt={`Картинка товара - ${product.title}`}
                                width={32}
                                height={32}
                            />

                            <p className={modalStyles['title']}>
                                {product.title}
                            </p>

                            <p className={modalStyles['price']}>
                                {product.price}
                                {CURRENCY_SYMBOL}
                            </p>
                        </a>
                    ))
                ) : (
                    <div className={modalStyles['hint-box']}>
                        <p className={modalStyles['hint']}>
                            По вашему запросу ничего не найдено
                        </p>
                    </div>
                )}
            </div>
        </ModalBackdrop>
    );
}
