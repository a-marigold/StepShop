'use client';

import { Controller, useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

import { addSuccessNotice, addErrorNotice } from '@/utils/noticeGlobalState';

import { deleteCategory } from '@/lib/api/products';
import ApiError from '@/utils/errors/ApiError';

import type { CategoryType } from '@shared/types/ProductTypes';
import type { CategoryOperationInput } from '../OperationInput';

import OperationForm from '../OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';
import operationStyles from '../../Operation.module.scss';

const deleteInputsList: CategoryOperationInput[] = [
    {
        name: 'ID категории',
        propertyName: 'id',
        htmlId: 'category-id-input',

        isRequired: true,
    },
];

export function DeleteCategoryForm() {
    const { control, handleSubmit } = useForm<CategoryType>();

    const dispatch = useDispatch<AppDispatch>();

    async function submit(data: Pick<CategoryType, 'id'>) {
        try {
            const deleteProductData = await deleteCategory(data.id);

            addSuccessNotice(
                `Category has been deleted`,
                `Category '${deleteProductData.name}' was deleted`,
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
            title='Удалить категорию'
            submitAction={handleSubmit(submit)}
        >
            {deleteInputsList.map((input, index) => (
                <Controller
                    key={index}
                    name='id'
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
