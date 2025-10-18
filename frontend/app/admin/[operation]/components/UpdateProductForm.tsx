'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addPositiveNotice, addErrorNotice } from '@/utils/noticeGlobalState';

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
    async function submit(data: ProductType) {
        const newProduct: ProductType = {
            ...data,
            price: Number(data.price),
        };

        try {
            console.log(JSON.stringify(newProduct));

            const updateProduct = await fetch(
                `http://127.0.0.1:1000/products/${newProduct.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                }
            );
            const updatedProduct = await updateProduct.text();

            console.log(updatedProduct);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <OperationForm
            title='Удалить товар'
            inputsList={updateInputsList}
            submitAction={submit}
        ></OperationForm>
    );
}
