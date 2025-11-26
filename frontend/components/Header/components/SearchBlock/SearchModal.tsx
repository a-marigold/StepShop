'use client';

import { useState, useEffect, useMemo } from 'react';

import type { Ref } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { clientGetProducts } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';

import { CURRENCY_SYMBOL } from '@/constants/currency';
import { TEMPORARY_PRODUCTS } from '@/constants/TEMPORARY_PRODUCTS';

import Image from 'next/image';

import ModalBackdrop from '@UI/ModalBackdrop';

import modalStyles from './SearchModal.module.scss';

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

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await clientGetProducts();

                setProducts(products);
            } catch (error) {
                if (error instanceof ApiError) {
                    setErrorMessage(error.message);
                }

                setProducts([]);
            }
        };

        loadProducts();
    }, []);

    const debouncedQuery = useDebounce(searchQuery, 100);

    // TODO: Temporarily here are TEMPORARY_PRODUCTS, because database with products died

    // const filteredProducts = useMemo(() => {
    //     return products.filter((product) =>
    //         product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    //     );
    // }, [debouncedQuery, products]);

    const filteredProducts = useMemo(() => {
        return TEMPORARY_PRODUCTS.filter((product) =>
            product.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
    }, [debouncedQuery]);

    console.log(debouncedQuery);

    return (
        <ModalBackdrop setShowModal={setShowModal}>
            <div
                ref={ref}
                className={modalStyles['search-modal']}
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {debouncedQuery.trim() && !!filteredProducts.length ? (
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
                            {errorMessage
                                ? errorMessage
                                : 'По вашему запросу ничего не найдено'}
                        </p>
                    </div>
                )}
            </div>
        </ModalBackdrop>
    );
}
