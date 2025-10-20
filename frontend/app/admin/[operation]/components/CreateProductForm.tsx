'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { apiOrigin } from '@/utils/getApiOrigin';
import { websiteOrigin } from '@/utils/getWebsiteOrigin';
import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

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
            const response = await fetch(`${apiOrigin}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const postProduct = (await response.json()) as ApiResponseType;

            const revalidateProductsResponse = await fetch(
                `${websiteOrigin}/api/revalidate`,
                {
                    method: 'POST',
                    body: JSON.stringify({ tag: 'products' }),
                }
            );

            const revalidateProductsData =
                (await revalidateProductsResponse.json()) as ApiResponseType;

            if (!response.ok || !revalidateProductsResponse.ok) {
                throw new ApiError(
                    `${postProduct.message}. ${revalidateProductsData.message}`
                );
            }

            addSuccessNotice(
                `Changes saved. ${revalidateProductsData.message}`,
                postProduct.message,
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
            title='Создать товар'
            inputsList={createInputsList}
            submitAction={submit}
        ></OperationForm>
    );
}
