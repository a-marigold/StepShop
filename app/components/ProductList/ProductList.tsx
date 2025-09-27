import { ProductType } from '@/types/ProductTypes';

import ProductCard from './ProductCard';

import productStyles from './ProductList.module.scss';

export default async function ProductList() {
    const response = await fetch('https://604781a0efa572c1.mokky.dev/items');
    const products = (await response.json()) as ProductType[];

    return (
        <div className={productStyles['products-list']}>
            {products.map((product, index) => (
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
