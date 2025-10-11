import type { ProductType } from '@shared/types/ProductTypes';
import type { SearchParamsProp } from '@/types/SearchParamsProp';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import ProductCard from './ProductCard';

import productStyles from './ProductList.module.scss';

export default async function ProductList({ searchParams }: SearchParamsProp) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const products = (await response.json()) as ProductType[];

    const queryParams = await searchParams;
    const minPrice = queryParams.minPrice ? Number(queryParams.minPrice) : null;
    const maxPrice = queryParams.maxPrice ? Number(queryParams.maxPrice) : null;

    // TODO: This function doesn`t work while there is json placeholder instead of mock with product.price or real server
    const filteredProducts = products.filter((product) => {
        if (minPrice !== null && product.price < minPrice) return false;
        if (maxPrice !== null && product.price > maxPrice) return false;

        return true;
    });

    return (
        <div className={productStyles['products-list']}>
            {filteredProducts.map((product, index) => (
                <ProductCard
                    key={`${product.title}-${product.image}-${index}`}
                    title={product.title}
                    image={'/images/white-t-shirt.webp'}
                    description='description 1 lorem ipsum dolor'
                    // TODO (3): Change the string below on ---> price={product.price}
                    // TEMPORARY SITUATION:
                    price={600}
                    //
                    currencySymbol={CURRENCY_SYMBOL}
                    quantity={1}
                />
            ))}
        </div>
    );
}
