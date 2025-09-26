import productStyles from './ProductList.module.scss';

export default function ProductCard() {
    return (
        <article className={productStyles['product-card']}>
            <div className={productStyles['image-block']}>
                <img src='' alt='' />
            </div>

            <div className={productStyles['description-block']}>
                <p className={productStyles['title']}></p>
                <p className={productStyles['description']}></p>
            </div>

            <div className={productStyles['order-block']}>
                <p className={productStyles['price']}></p>
                <button className={productStyles['add-button']}></button>
            </div>
        </article>
    );
}
