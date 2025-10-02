import type { ProductType } from '@/types/ProductTypes';
import type { SearchParamsProp } from '@/types/SearchParamsProp';

import ProductCard from './ProductCard';

import productStyles from './ProductList.module.scss';

export default async function ProductList({ searchParams }: SearchParamsProp) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-store',
    });
    const products = (await response.json()) as ProductType[];

    const minPrice = searchParams.minPrice
        ? Number(searchParams.minPrice)
        : null;
    const maxPrice = searchParams.maxPrice
        ? Number(searchParams.maxPrice)
        : null;

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
                    price={product.price}
                    currencySymbol='₸'
                />
            ))}
        </div>
    );
}
