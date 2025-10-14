import EmptyProductCard from './EmptyProductCard';

import productStyles from '../ProductList.module.scss';

const emptyProducts = Array.from({ length: 10 });

export function Loading() {
    return (
        <div className={productStyles['products-list']}>
            {emptyProducts.map((_, index) => (
                <EmptyProductCard key={index} />
            ))}
        </div>
    );
}
