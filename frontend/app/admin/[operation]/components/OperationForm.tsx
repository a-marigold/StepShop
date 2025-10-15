'use client';

import { Controller, useForm } from 'react-hook-form';

import type { OperationInput } from './OperationInput';

import PrimaryInput from '@/UI/PrimaryInput';
import AccessButton from '@/UI/AccessButton';

import operationStyles from '../Operation.module.scss';
import { ProductType } from '@shared/types/ProductTypes';

interface OperationFormProps {
    title: string;

    inputsList: OperationInput[];

    submitAction: (...args: any) => void;
}

export default function OperationForm({
    title,

    inputsList,

    submitAction,
}: OperationFormProps) {
    const { control, handleSubmit } = useForm<ProductType>();

    return (
        <form
            onSubmit={handleSubmit(submitAction)}
            className={operationStyles['operation-form']}
        >
            <p className={operationStyles['title']}>{title}</p>

            <div className={operationStyles['inputs-box']}>
                {inputsList.map((input, index) => (
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
            </div>

            <AccessButton
                title='Отправить'
                ariaLabel='Отправить новые данные о товаре на сервер'
                buttonType='submit'
            />
        </form>
    );
}
