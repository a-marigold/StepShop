'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { patchProduct } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { ProductType } from '@shared/types/ProductTypes';
import type { OperationInput } from '../OperationInput';

import OperationForm from '../OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';
import FileInput from '@UI/FileInput';

import operationStyles from '../../Operation.module.scss';

const updateInputsList: OperationInput[] = [
    {
        name: 'ID товара',
        propertyName: 'id',
        htmlId: 'new-product-id-input',
        errorMessage: 'ID товара обязателен',
        isRequired: true,
    },

    {
        name: 'Новое название товара',
        htmlId: 'new-product-title-input',
        propertyName: 'title',
        isRequired: false,
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
        isRequired: false,
    },
];

export function UpdateProductForm() {
    const { control, handleSubmit } = useForm<
        ProductType & { imageFile: File }
    >();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: ProductType & { imageFile: File }) {
        const { imageFile, ...productData } = data;

        const newProduct: ProductType = {
            ...productData,
            price: Number(data.price),
        };

        try {
            const updateProductData = await patchProduct(newProduct, imageFile);

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
        <OperationForm
            title='Обновить товар'
            submitAction={handleSubmit(submit)}
        >
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

            <Controller
                control={control}
                name='imageFile'
                render={({ field, fieldState }) => (
                    <FileInput
                        title='Изображение товара'
                        accept='.png, .webp'
                        htmlId='image-file-input'
                        errorLabelTitle='Изображение товара обязательно'
                        inputAction={(event) => {
                            field.onChange(event.target.files?.[0]);
                        }}
                        isValid={!fieldState.error}
                    />
                )}
            />
        </OperationForm>
    );
}
