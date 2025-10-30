export type OperationRoot = 'products' | 'categories';

export type OperationPath =
    | '/admin/products/create'
    | '/admin/products/delete'
    | '/admin/products/update'
    | '/admin/categories/create'
    | '/admin/categories/delete';

export type OperationType =
    | 'createProduct'
    | 'deleteProduct'
    | 'updateProduct'
    | 'createCategory'
    | 'deleteCategory';

export const operationsList: {
    title: string;

    path: OperationPath;

    type: OperationType;
}[] = [
    {
        title: 'Создать товар',
        path: '/admin/products/create',
        type: 'createProduct',
    },
    {
        title: 'Удалить товар',
        path: '/admin/products/delete',
        type: 'deleteProduct',
    },
    {
        title: 'Обновить товар',
        path: '/admin/products/update',
        type: 'updateProduct',
    },

    {
        title: 'Создать категорию',
        path: '/admin/categories/create',
        type: 'createCategory',
    },

    {
        title: 'Удалить категорию',
        path: '/admin/categories/delete',
        type: 'deleteCategory',
    },
];
