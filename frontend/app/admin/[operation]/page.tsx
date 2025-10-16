import type { Metadata } from 'next';

import {
    CreateProductForm,
    DeleteProductForm,
    UpdateProductForm,
} from './components';

// TEST
import Notice from '@/UI/Notice';
//

import operationStyles from './Operation.module.scss';

type Operation = 'create' | 'delete' | 'update' | never;

interface OperationPageProps {
    params: {
        operation: Operation;
    };
}

export async function generateMetadata({
    params,
}: OperationPageProps): Promise<Metadata> {
    const pageTitles: Record<Operation, string> = {
        create: 'Добавление товара',
        delete: 'Удаление товара',
        update: 'Обновление товара',
    };
    const operation = await params.operation;

    return {
        title: pageTitles[operation],
        openGraph: {
            title: pageTitles[operation],
        },
    };
}

export default async function OperationPage({ params }: OperationPageProps) {
    const operation = await params.operation;

    return (
        <main className={operationStyles['operation-page']}>
            {operation === 'create' && <CreateProductForm />}

            {operation === 'delete' && <DeleteProductForm />}

            {operation === 'update' && <UpdateProductForm />}

            {/* _TEST_ */}
            <Notice
                title='Title of notice'
                message='Message lorem ipsum'
                existenceTime={10}
            />
            {/*  */}
        </main>
    );
}
