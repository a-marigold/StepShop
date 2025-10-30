import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { usePathname } from 'next/navigation';

import { apiOrigin } from '@/utils/getApiOrigin';

import {
    ProductType,
    CategoryListType,
    ProductListSchema,
    CategoryListSchema,
} from '@shared/types/ProductTypes';
import type { OperationRoot } from '@/app/admin/adminOperations';

import ProductsStream from './ProductsStream';
import CategoriesStream from './CategoriesStream';

export default function StreamWrapper() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [categories, setCategories] = useState<CategoryListType>([]);

    // TODO: Add error handling
    useEffect(() => {
        const stream = new EventSource(`${apiOrigin}/products/stream`);

        stream.addEventListener('updateProducts', (event) => {
            try {
                ProductListSchema.parse(event.data);

                console.log(event.data);
                setProducts(event.data);
            } catch (error) {
                setProducts([]);
            }
        });

        stream.addEventListener('updateCategories', (event) => {
            try {
                CategoryListSchema.parse(event.data);
                setCategories(event.data);
            } catch (error) {
                setCategories([]);
            }
        });

        return () => {
            stream.close();
        };
    }, []);

    const splitPathname = usePathname().split('/') as OperationRoot[];

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
