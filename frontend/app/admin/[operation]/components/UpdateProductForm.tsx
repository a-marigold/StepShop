'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { patchProduct } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from './OperationInput';

import OperationForm from './OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';
import operationStyles from '../Operation.module.scss';

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
        name: 'Новая цена товара',
        htmlId: 'new-product-price-input',

        propertyName: 'price',

        errorMessage: 'Цена товара обязательна',
        isRequired: true,
    },
];

export function UpdateProductForm() {
    const { control, handleSubmit } = useForm<ProductType>();

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
        <OperationForm title='Обновить товар' submitAction={submit}>
            {updateInputsList.map((input, index) => (
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
