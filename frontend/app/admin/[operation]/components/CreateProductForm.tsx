'use client';

import { Controller, useForm } from 'react-hook-form';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

import OperationForm from './OperationForm';

import operationStyles from '../Operation.module.scss';

const createInputsList: OperationInput[] = [
    {
        name: 'Название товара',
        htmlId: 'title',
        propertyName: 'title',
        isRequired: true,
    },

    {
        name: 'Описание товара',
        htmlId: 'description',
        propertyName: 'description',
        isRequired: false,
    },

    {
        name: 'Изображение товара',
        htmlId: 'image',
        propertyName: 'image',
        isRequired: true,
    },

    {
        name: 'Цена товара',
        htmlId: 'price',

        propertyName: 'price',

        errorMessage: 'Цена товара обязательна',
        isRequired: true,
    },

    {
        name: 'Количество',
        htmlId: 'quantity',
        propertyName: 'quantity',
        isRequired: true,
    },
];

export function CreateProductForm() {
    async function submit(data: ProductType) {
        const newProduct: ProductType = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
        };

        try {
            console.log(JSON.stringify(newProduct));
            const postProduct = await fetch('http://127.0.0.1:1000/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            const sentProduct = await postProduct.json();
            console.log(sentProduct);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <OperationForm
            title='Создать товар'
            inputsList={createInputsList}
            submitAction={submit}
        ></OperationForm>
    );
}
