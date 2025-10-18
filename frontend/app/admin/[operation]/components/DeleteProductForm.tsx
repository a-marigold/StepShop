'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

import OperationForm from './OperationForm';

const deleteInputsList: OperationInput[] = [
    {
        name: 'ID товара',
        propertyName: 'id',
        htmlId: 'product-id-input',
        isRequired: true,
    },
];

export function DeleteProductForm() {
    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: Pick<ProductType, 'id'>) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/products/${data.id}` ||
                    `http://localhost:1000/products/${data.id}`,
                {
                    method: 'DELETE',
                }
            );

            const deleteProduct = (await response.json()) as ApiResponseType;

            if (!response.ok) {
                throw new ApiError(deleteProduct.message);
            }

            addSuccessNotice(
                'Product has been deleted',
                deleteProduct.message,
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
            title='Удалить товар'
            inputsList={deleteInputsList}
            submitAction={submit}
        ></OperationForm>
    );
}
