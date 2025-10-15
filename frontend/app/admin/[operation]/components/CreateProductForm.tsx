'use client';

import OperationForm from './OperationForm';

import PrimaryInput from '@/UI/PrimaryInput';

import operationStyles from '../Operation.module.scss';

export function CreateProductForm() {
    return (
        <OperationForm
            title='Создать товар'
            submitAction={() => console.log('a')}
        >
            <PrimaryInput
                htmlId='create-product-input'
                title='Название товара'
                isValid={true}
                inputAction={(event) => console.log(event)}
                className={operationStyles['operation-input']}
            />
            <PrimaryInput
                htmlId='create-product-input'
                title='Название товара'
                isValid={true}
                inputAction={(event) => console.log(event)}
            />
        </OperationForm>
    );
}
