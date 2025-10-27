'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { postCategory } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { CategoryType } from '@shared/types/ProductTypes';
import type { CategoryOperationInput } from '../OperationInput';

import OperationForm from '../OperationForm';

import operationStyles from '../../Operation.module.scss';
import PrimaryInput from '@/UI/PrimaryInput';

const createInputsList: CategoryOperationInput[] = [
    {
        name: 'ID категории',
        htmlId: 'category-id',
        propertyName: 'id',
        placeholder: 'sneakers',
        isRequired: true,
    },

    {
        name: 'Название категории',
        htmlId: 'category-name',
        propertyName: 'name',
        placeholder: 'Кроссовки',
        isRequired: true,
    },
];

export function CreateCategoryForm() {
    const { control, handleSubmit } = useForm<CategoryType>();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: CategoryType) {
        const { id, name } = data;

        try {
            await postCategory(id, name);

            addSuccessNotice(`Changes saved`, '', 10, dispatch);
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
            title='Создать категорию'
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
                            placeholder={input.placeholder}
                        />
                    )}
                />
            ))}
        </OperationForm>
    );
}
