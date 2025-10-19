'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { apiOrigin } from '@/utils/getApiOrigin';
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
            const response = await fetch(`${apiOrigin}/products/${data.id}`, {
                method: 'DELETE',
            });

            const deleteProduct = (await response.json()) as ApiResponseType;

            if (!response.ok) {
                throw new ApiError(deleteProduct.message);
            }

            const revalidateProductsResponse = await fetch(`api/revalidate`, {
                body: JSON.stringify({ tag: 'products' }),
            });
            const revalidateProductsData =
                (await revalidateProductsResponse.json()) as ApiResponseType;

            addSuccessNotice(
                `Product has been deleted. ${revalidateProductsData.message}`,
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
