'use client';

import { useState, useEffect } from 'react';

import type { ProductType } from '@shared/types/ProductTypes';

import { apiOrigin } from '@/utils/getApiOrigin';

import LoadingSpinner from '@/UI/LoadingSpinner';
import JSONCodeBlock from '@/UI/JSONCodeBlock';

import asideStyles from './Aside.module.scss';

export default function ProductsStream() {
    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        const productsStream = new EventSource(`${apiOrigin}/products/stream`);

        productsStream.addEventListener('message', (event) => {
            setProducts(event.data);

            console.log(event);
        });

        return () => {
            productsStream.close();
        };
    }, []);

    console.log(products);

    return (
        <div>
            <p className={asideStyles['title']}>Товары</p>

            {products?.length ? (
                <JSONCodeBlock json={products} />
            ) : (
                <div className={asideStyles['loading-block']}>
                    <LoadingSpinner borderWidth='3px' size='32px' />
                </div>
            )}
        </div>
    );
}
