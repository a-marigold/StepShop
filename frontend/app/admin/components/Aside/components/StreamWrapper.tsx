import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import type { ProductType, CategoryListType } from '@shared/types/ProductTypes';
import type { OperationPath } from '@/app/admin/adminOperations';

import ProductsStream from './ProductsStream';
import CategoriesStream from './CategoriesStream';

import asideStyles from '../Aside.module.scss';

export default function StreamWrapper() {
    const splitPathname = usePathname().split('/') as OperationRoot[];

    type OperationRoot = 'products' | 'categories';
    const operationRoots: OperationRoot[] = ['products', 'categories'];

    const currentOperationRoot = splitPathname.find((name) =>
        operationRoots.includes(name)
    );

    const streamComponents: { [key in string]: ReactNode } = {
        products: <ProductsStream products={[]} />,
        categories: <CategoriesStream categories={[]} />,
    };

    return (
        <>
            {currentOperationRoot
                ? streamComponents[currentOperationRoot]
                : '___FALLBACK___'}
        </>
    );
}
