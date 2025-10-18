'use client';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addPositiveNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { ApiError } from '@/utils/errors/ApiError';
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
            const deleteProduct = await fetch(
                `http://127.0.0.1:1000/products/${data.id}`,
                {
                    method: 'DELETE',
                }
            );

            const deletedProduct = await deleteProduct.text();

            if (!deleteProduct.ok) {
                throw new ApiError('e');
            }

            addPositiveNotice(
                'Product has been deleted',
                deletedProduct,
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
