import { serverGetProducts } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@step-shop/shared/types/ProductTypes';

import type { SearchParamsProp } from '@/types/SearchParamsProp';

import { CURRENCY_SYMBOL } from '@/constants/currency';

// !
import { TEMPORARY_PRODUCTS } from '@/constants/TEMPORARY_PRODUCTS';
// !

import ProductCard from './components/ProductCard';

import NotFoundProductList from './components/NotFoundProductList';

import productStyles from './ProductList.module.scss';

export default async function ProductList({ searchParams }: SearchParamsProp) {
    // TODO: products are from hard coded constant TEMPORARILY, because database with products died:
    // let products: ProductType[];
    // let errorMessage: string | undefined;

    // try {
    //     const getProducts = await serverGetProducts();

    //     products = getProducts;
    // } catch (error) {
    //     if (error instanceof ApiError) {
    //         errorMessage = error.message;
    //     }
    //     products = [];
    // }

    // const queryParams = await searchParams;
    // const minPrice = queryParams.minPrice ? Number(queryParams.minPrice) : null;
    // const maxPrice = queryParams.maxPrice ? Number(queryParams.maxPrice) : null;

    // const filteredProducts = errorMessage
    //     ? []
    //     : products.filter((product) => {
    //           if (minPrice !== null && product.price < minPrice) return false;

    //           if (maxPrice !== null && product.price > maxPrice) return false;

    //           return true;
    //       });

    // return (
    //     <div className={productStyles['products-list']}>
    //         {filteredProducts.length ? (
    //             filteredProducts.map((product) => (
    //                 <ProductCard
    //                     key={product.id}
    //                     category={product.category}
    //                     id={product.id}
    //                     title={product.title}
    //                     image={product.image}
    //                     description={product.description}
    //                     price={product.price}
    //                     currencySymbol={CURRENCY_SYMBOL}
    //                     quantity={1}
    //                 />
    //             ))
    //         ) : errorMessage ? (
    //             <p className={productStyles['server-error-message']}>
    //                 {errorMessage}
    //             </p>
    //         ) : (
    //             <NotFoundProductList />
    //         )}
    //     </div>
    // );

    return (
        <div className={productStyles['products-list']}>
            {TEMPORARY_PRODUCTS.map((product) => (
                <ProductCard
                    key={product.id}
                    category={product.category}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                    currencySymbol={CURRENCY_SYMBOL}
                    quantity={1}
                />
            ))}
        </div>
    );
}
