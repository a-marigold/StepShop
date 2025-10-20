'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { patchProduct } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

import OperationForm from './OperationForm';

const updateInputsList: OperationInput[] = [
    {
        name: 'ID товара',
        propertyName: 'id',
        htmlId: 'new-product-id-input',
        isRequired: true,
    },

    {
        name: 'Новое название товара',
        htmlId: 'new-product-title-input',
        propertyName: 'title',
        isRequired: true,
    },

    {
        name: 'Новое описание товара',
        htmlId: 'new-product-description-input',
        propertyName: 'description',
        isRequired: false,
    },

    {
        name: 'Новое изображение товара',
        htmlId: 'new-product-image-input',
        propertyName: 'image',
        isRequired: true,
    },

    {
        name: 'Новая цена товара',
        htmlId: 'new-product-price-input',

        propertyName: 'price',

        errorMessage: 'Цена товара обязательна',
        isRequired: true,
    },
];

export function UpdateProductForm() {
    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: ProductType) {
        const newProduct: ProductType = {
            ...data,
            price: Number(data.price),
        };

        try {
            const updateProductData = await patchProduct(newProduct);

            addSuccessNotice(
                'Changes saved',
                updateProductData.message,
                10,
                dispatch
            );
        } catch (error) {
            if (error instanceof ApiError) {
                addErrorNotice(
                    'Error with request',
                    error.message,
                    10,
                    dispatch
                );
            }
        }
    }

    return (
        <OperationForm
            title='Обновить товар'
            inputsList={updateInputsList}
            submitAction={submit}
        ></OperationForm>
    );
}
