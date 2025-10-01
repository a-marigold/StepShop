import loadingStyles from './Loading.module.scss';

export default function EmptyProductCard() {
    return (
        <div className={loadingStyles['product-card']}>
            <div className={loadingStyles['image-block']}>
                <div className={loadingStyles['image']} />
            </div>

            <div className={loadingStyles['description-block']}>
                <div className={loadingStyles['title-fallback']} />
                <div className={loadingStyles['description-fallback']} />
                <div className={loadingStyles['description-fallback']} />
                <div className={loadingStyles['description-fallback']} />
            </div>

            <div className={loadingStyles['order-block']}>
                <div className={loadingStyles['price-block']}></div>

                <div className={loadingStyles['add-button-block']}></div>
            </div>
        </div>
    );
}
