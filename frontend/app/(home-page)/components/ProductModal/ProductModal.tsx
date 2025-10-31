'use-client';

import Image from 'next/image';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addProduct, increaseTotalAmount } from '@/redux/CartSlice';

import { ClientProductType } from '@/types/ClientProductType';

import ModalBackdrop from '@/UI/ModalBackdrop';
import AccessButton from '@UI/AccessButton';
import SizePicker from '@UI/SizePicker';
import CloseModalCross from '@/UI/CloseModalCross';
import modalStyles from './ProductModal.module.scss';

interface ProductModalProps extends ClientProductType {
    setShowModal: (showModal: boolean) => void;
}

export default function ProductModal({
    id,
    image,
    title,
    description,
    price,
    currencySymbol,
    setShowModal,
}: ProductModalProps) {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ModalBackdrop
            setShowModal={setShowModal}
            props={{ className: modalStyles['modal-backdrop'] }}
        >
            <div className={modalStyles['modal-wrapper']}>
                <div
                    className={modalStyles['product-modal']}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className={modalStyles['image-block']}>
                        <Image
                            src={image}
                            width={200}
                            height={200}
                            alt='Изображение товара'
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
                            className={modalStyles['access-button']}
                            ariaLabel={`Добавить товар в корзину за ${price} ${currencySymbol}`}
                            clickAction={() => {
                                dispatch(
                                    addProduct({
                                        id: id,
                                        image: image,
                                        title: title,
                                        description: description,
                                        price: price,
                                        currencySymbol: currencySymbol,
                                        quantity: 1,
                                    })
                                );
                                dispatch(increaseTotalAmount(price));
                            }}
                        />
                    </div>
                </div>

                <CloseModalCross
                    className={modalStyles['close-modal-cross']}
                    clickAction={() => setShowModal(false)}
                />
            </div>
        </ModalBackdrop>
    );
}
