import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import {
    CreateProductForm,
    DeleteProductForm,
    UpdateProductForm,
    //
    CreateCategoryForm,
    DeleteCategoryForm,
} from './components';

import type { OperationType, OperationPath } from '../adminOperations';

import operationStyles from './Operation.module.scss';

interface OperationPageProps {
    params: {
        operation: string[];
    };
}

export async function generateMetadata({
    params,
}: OperationPageProps): Promise<Metadata> {
    const pageTitles: Record<OperationPath, string> = {
        '/admin/products/create': 'Создание товара',
        '/admin/products/delete': 'Удаление товара',
        '/admin/products/update': 'Обновление товара',

        '/admin/categories/create': 'Создание категории', // обратите внимание: опечатка в "categires"
        '/admin/categories/delete': 'Удаление категории',
    };

    const operation = await params.operation;

    const path = `/admin/${operation.join('/')}` as OperationPath;

    return {
        title: pageTitles[path],
        openGraph: {
            title: pageTitles[path],
        },
    };
}

const operationComponentList: Record<OperationPath, ReactNode> = {
    '/admin/products/create': <CreateProductForm />,
    '/admin/products/delete': <DeleteProductForm />,

    '/admin/products/update': <UpdateProductForm />,

    '/admin/categories/create': <CreateCategoryForm />,
    '/admin/categories/delete': <DeleteCategoryForm />,
};

export default async function OperationPage({ params }: OperationPageProps) {
    const operation = await params.operation;

    const path = `/admin/${operation.join('/')}` as OperationPath;

    return (
        <main className={operationStyles['operation-page']}>
            {operationComponentList[path]}
        </main>
    );
}
