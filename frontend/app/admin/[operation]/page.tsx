import type { Metadata } from 'next';

import { CreateProductForm } from './components';

import operationStyles from './Operation.module.scss';

type Operation = 'create' | 'delete' | 'update' | never;

interface OperationPageProps {
    params: {
        operation: Operation;
    };
}

export function generateMetadata({ params }: OperationPageProps): Metadata {
    const pageTitles: Record<Operation, string> = {
        create: 'Добавление товара',
        delete: 'Удаление товара',
        update: 'Обновление товара',
    };

    return {
        title: pageTitles[params.operation],
        openGraph: {
            title: pageTitles[params.operation],
        },
    };
}

export default function OperationPage({ params }: OperationPageProps) {
    return (
        <main className={operationStyles['operation-page']}>
            {params.operation === 'create' && <CreateProductForm />}

            {params.operation === 'delete' && <CreateProductForm />}

            {params.operation === 'update' && <CreateProductForm />}
        </main>
    );
}
