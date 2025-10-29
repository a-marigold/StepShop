'use client';

import { useState, useEffect } from 'react';

import type { ProductType } from '@shared/types/ProductTypes';

import { apiOrigin } from '@/utils/getApiOrigin';

import LoadingSpinner from '@/UI/LoadingSpinner';

import JSONCodeBlock from '@/UI/JSONCodeBlock';

import asideStyles from '../Aside.module.scss';

interface ProductsStreamProps {
    products: ProductType[];
}
export default function ProductsStream({ products }: ProductsStreamProps) {
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
