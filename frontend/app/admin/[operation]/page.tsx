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

import type { OperationType } from '../adminOperations';

import operationStyles from './Operation.module.scss';

interface OperationPageProps {
    params: {
        operation: OperationType;
    };
}

export async function generateMetadata({
    params,
}: OperationPageProps): Promise<Metadata> {
    const pageTitles: Record<OperationType, string> = {
        createProduct: 'Создание товара',
        deleteProduct: 'Удаление товара',
        updateProduct: 'Обновление товара',

        createCategory: 'Создание категории',
        deleteCategory: 'Удаление категории',
    };

    const { operation } = await params;

    return {
        title: pageTitles[operation],
        openGraph: {
            title: pageTitles[operation],
        },
    };
}

const operationComponentList: Record<OperationType, ReactNode> = {
    createProduct: <CreateProductForm />,
    deleteProduct: <DeleteProductForm />,

    updateProduct: <UpdateProductForm />,

    createCategory: <CreateCategoryForm />,
    deleteCategory: <DeleteCategoryForm />,
};

export default async function OperationPage({ params }: OperationPageProps) {
    const { operation } = await params;

    return (
        <main className={operationStyles['operation-page']}>
            {operationComponentList[operation]}
        </main>
    );
}
