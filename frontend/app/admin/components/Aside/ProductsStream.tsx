'use client';

import { useState, useEffect } from 'react';

import JSONCodeBlock from '@/UI/JSONCodeBlock';

import type { ProductType } from '@shared/types/ProductTypes';

import { apiOrigin } from '@/utils/getApiOrigin';

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

    return (
        <div>
            <p className={asideStyles['title']}>Товары</p>

            {products ? <JSONCodeBlock json={products} /> : ''}
        </div>
    );
}
