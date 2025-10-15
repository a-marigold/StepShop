'use client';

import type { ReactNode } from 'react';

import AccessButton from '@/UI/AccessButton';

import operationStyles from '../Operation.module.scss';

interface OperationFormProps {
    title: string;

    submitAction: () => void;

    children: ReactNode;
}

export default function OperationForm({
    title,

    submitAction,

    children,
}: OperationFormProps) {
    return (
        <form
            onSubmit={submitAction}
            className={operationStyles['operation-form']}
        >
            <p className={operationStyles['title']}>{title}</p>

            <div className={operationStyles['inputs-box']}>{children}</div>

            <AccessButton
                title='Отправить'
                ariaLabel='Отправить новые данные о товаре на сервер'
            />
        </form>
    );
}
