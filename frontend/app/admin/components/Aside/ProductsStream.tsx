'use client';

import { useState, useEffect } from 'react';

import JSONCodeBlock from '@/UI/JSONCodeBlock';

import type { ProductType } from '@shared/types/ProductTypes';

import asideStyles from './Aside.module.scss';

export default function ProductsStream() {
    const [products, setProducts] = useState<ProductType[]>();

    useEffect(() => {
        const productsStream = new EventSource('');

        productsStream.addEventListener('message', (event) => {
            setProducts(event.data);
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
