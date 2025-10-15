'use client';

import { Controller, useForm } from 'react-hook-form';

import type { ProductType } from '@shared/types/ProductTypes';

import OperationForm from './OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';

import operationStyles from '../Operation.module.scss';

type OperationInput = {
    name: string;
    propertyName: keyof ProductType;

    htmlId: string;

    isRequired?: boolean;
    errorMessage?: string;
};
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
    const { control, handleSubmit } = useForm<ProductType>();

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
            const sentProduct = await postProduct.json();
            console.log(sentProduct);
        } catch (error) {
            console.error(error);
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
        </OperationForm>
    );
}
