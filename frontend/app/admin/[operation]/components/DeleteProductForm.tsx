'use client';

import { Controller, useForm } from 'react-hook-form';

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
    async function submit(data: Pick<ProductType, 'id'>) {
        try {
            const postProduct = await fetch(
                `http://127.0.0.1:1000/products/${data.id}`,
                {
                    method: 'DELETE',
                }
            );
            const deletedProduct = await postProduct.json();

            console.log(deletedProduct);
        } catch (error) {
            // console.error(error);
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
