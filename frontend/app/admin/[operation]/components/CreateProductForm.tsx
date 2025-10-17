'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addNotice, deleteNotice } from '@/redux/NoticeSlice';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';
import type { NoticeType } from '@/types/NoticeType';

import OperationForm from './OperationForm';

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
    const dispatch = useDispatch<AppDispatch>();

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
            const sentProduct = await postProduct.text();

            if (!postProduct.ok) {
                throw postProduct.statusText;
            }

            dispatch(
                addNotice({
                    id: crypto.randomUUID(),
                    title: 'Changes saved',
                    message: sentProduct,
                    existenceTime: 6,
                })
            );
        } catch (error) {
            console.error(error);

            if (typeof error === 'string')
                dispatch(
                    addNotice({
                        id: crypto.randomUUID(),
                        title: 'Error with request',
                        message: error,
                        existenceTime: 6,
                    })
                );
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
