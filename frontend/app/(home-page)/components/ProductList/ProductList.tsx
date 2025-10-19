import { apiOrigin } from '@/utils/getApiOrigin';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@step-shop/shared/types/ProductTypes';
import type { SearchParamsProp } from '@/types/SearchParamsProp';

import { CURRENCY_SYMBOL } from '@/constants/currency';

import ProductCard from './components/ProductCard';
import NotFoundProductList from './components/NotFoundProductList';

import productStyles from './ProductList.module.scss';

export default async function ProductList({ searchParams }: SearchParamsProp) {
    let products: ProductType[];
    let errorMessage: string | undefined;

    try {
        const response = await fetch(`${apiOrigin}/products`, {
            cache: 'no-store',
        });
        products = await response.json();

        if (!response.ok) {
            throw new ApiError('Internal server error');
        }
    } catch (error) {
        if (error instanceof ApiError) {
            errorMessage = error.message;
        }
        products = [];
    }

    const queryParams = await searchParams;
    const minPrice = queryParams.minPrice ? Number(queryParams.minPrice) : null;
    const maxPrice = queryParams.maxPrice ? Number(queryParams.maxPrice) : null;

    const filteredProducts = errorMessage
        ? []
        : products.filter((product) => {
              if (minPrice !== null && product.price < minPrice) return false;
              if (maxPrice !== null && product.price > maxPrice) return false;

              return true;
          });

    return (
        <div className={productStyles['products-list']}>
            {filteredProducts.length ? (
                filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        currencySymbol={CURRENCY_SYMBOL}
                        quantity={1}
                    />
                ))
            ) : errorMessage ? (
                <p className={productStyles['server-error-message']}>
                    {errorMessage}
                </p>
            ) : (
                <NotFoundProductList />
            )}
        </div>
    );
}
