'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { postProduct } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from '../OperationInput';

import OperationForm from '../OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';
import FileInput from '@/UI/FileInput';

import operationStyles from '../../Operation.module.scss';

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
    const { control, handleSubmit } = useForm<
        ProductType & { imageFile: File }
    >();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: ProductType & { imageFile: File }) {
        const { imageFile, ...productData } = data;

        const newProduct: ProductType = {
            ...productData,
            price: Number(productData.price),
            quantity: Number(productData.quantity),
        };

        try {
            const postProductData = await postProduct(newProduct, imageFile);

            addSuccessNotice(
                `Changes saved`,
                postProductData.message,
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
            submitAction={handleSubmit(submit)}
        >
            {createInputsList.map((input, index) => (
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

            <Controller
                name='imageFile'
                control={control}
                rules={{ required: 'Изображение товара обязательно' }}
                render={({ field, fieldState }) => (
                    <FileInput
                        title='Изображение товара'
                        htmlId='product-image-input'
                        accept='.png, .webp'
                        isValid={!fieldState.error}
                        errorLabelTitle='Это поле обязательно'
                        inputAction={(event) => {
                            field.onChange(event.target.files?.[0]);
                        }}
                    />
                )}
            />
        </OperationForm>
    );
}
