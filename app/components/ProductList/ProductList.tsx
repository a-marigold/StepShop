import ProductCard from './ProductCard';

import productStyles from './ProductList.module.scss';

export default function ProductList() {
    return (
        <div className={productStyles['products-list']}>
            <ProductCard />
        </div>
    );
}
