'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { deleteProduct } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

import OperationForm from './OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';
import operationStyles from '../Operation.module.scss';

const deleteInputsList: OperationInput[] = [
    {
        name: 'ID товара',
        propertyName: 'id',
        htmlId: 'product-id-input',

        isRequired: true,
    },
];

export function DeleteProductForm() {
    const { control, handleSubmit } = useForm<ProductType>();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: Pick<ProductType, 'id'>) {
        try {
            const deleteProductData = await deleteProduct(data.id);

            addSuccessNotice(
                `Product has been deleted`,
                deleteProductData.message,
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
            submitAction={handleSubmit(submit)}
        >
            {deleteInputsList.map((input, index) => (
                <Controller
                    key={index}
                    name={input.propertyName}
                    control={control}
                    rules={
                        input.isRequired
                            ? {
                                  required: input.errorMessage
                                      ? input.errorMessage
                                      : `${input.name} обязательно`,
                              }
                            : undefined
                    }
                    render={({ field, fieldState }) => (
                        <PrimaryInput
                            htmlId={input.htmlId}
                            title={input.name}
                            className={operationStyles['operation-input']}
                            inputAction={field.onChange}
                            isValid={!fieldState.error}
                            errorLabelTitle={fieldState.error?.message}
                        />
                    )}
                />
            ))}
        </OperationForm>
    );
}
