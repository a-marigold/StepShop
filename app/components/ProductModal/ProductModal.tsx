'use-client';

import Image from 'next/image';

import type { ProductType } from '@/types/ProductTypes';

import AccessButton from '@UI/AccessButton';
import SizePicker from '@UI/SizePicker';

import modalStyles from './ProductModal.module.scss';

interface ProductModalProps extends ProductType {
    setShowModal: (showModal: boolean) => void;
}

export default function ProductModal({
    image,
    title,
    description,
    price,
    currencySymbol,
    setShowModal,
}: ProductModalProps) {
    return (
        <div
            className={modalStyles['modal-backdrop']}
            onClick={() => setShowModal(false)}
        >
            <div
                className={modalStyles['product-modal']}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={modalStyles['image-block']}>
                    <Image
                        src={image}
                        width={200}
                        height={200}
                        alt='Product image'
                    />
                </div>

                <div className={modalStyles['access-block']}>
                    <div className={modalStyles['text-block']}>
                        <p className={modalStyles['title']}> {title}</p>
                        {description && (
                            <p className={modalStyles['description']}>
                                {description}
                            </p>
                        )}
                    </div>

                    <SizePicker
                        sizeOptions={[
                            { title: 1, id: 0 },
                            { title: 2, id: 1 },
                            { title: 3, id: 2 },
                        ]}
                    ></SizePicker>

                    <AccessButton
                        title={`Добавить в корзину за ${price} ${currencySymbol}`}
                        classNames={[modalStyles['access-button']]}
                        ariaLabel={`Добавить товар в корзину за ${price} ${currencySymbol}`}
                    />
                </div>
            </div>
        </div>
    );
}
