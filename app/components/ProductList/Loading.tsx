import EmptyProductCard from './EmptyProductCard';

import productStyles from './ProductList.module.scss';

const emptyProducts = Array(10);

export function Loading() {
    return (
        <div className={productStyles['products-list']}>
            {emptyProducts.map(() => (
                <EmptyProductCard />
            ))}
        </div>
    );
}
