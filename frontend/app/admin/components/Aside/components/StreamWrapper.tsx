import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { ProductType, CategoryListType } from '@shared/types/ProductTypes';
import type { OperationPath } from '@/app/admin/adminOperations';

import ProductsStream from './ProductsStream';
import CategoriesStream from './CategoriesStream';

export default function StreamWrapper() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryListType>([]);

    // TODO: Add error handling
    useEffect(() => {
        const stream = new EventSource(`${apiOrigin}/products/stream`);

        stream.addEventListener('updateProducts', (event) => {
            setProducts(event.data);
        });

        stream.addEventListener('updateCategories', (event) => {
            setCategories(event.data);
        });

        return () => {
            stream.close();
        };
    }, []);

    const splitPathname = usePathname().split('/') as OperationRoot[];

    type OperationRoot = 'products' | 'categories';
    const operationRoots: OperationRoot[] = ['products', 'categories'];

    const currentOperationRoot = splitPathname.find((name) =>
        operationRoots.includes(name)
    );

    const streamComponents: { [key in string]: ReactNode } = {
        products: <ProductsStream products={products} />,
        categories: <CategoriesStream categories={categories} />,
    };

    return (
        <>
            {currentOperationRoot
                ? streamComponents[currentOperationRoot]
                : '___FALLBACK___'}
        </>
    );
}
