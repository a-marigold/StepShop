export type OperationType =
    | 'createProduct'
    | 'deleteProduct'
    | 'updateProduct'
    | 'createCategory'
    | 'deleteCategory';

export const operationsList: {
    title: string;

    path: string;

    type: OperationType;
}[] = [
    {
        title: 'Создать товар',
        path: '/admin/createProduct',
        type: 'createProduct',
    },
    {
        title: 'Удалить товар',
        path: '/admin/deleteProduct',
        type: 'deleteProduct',
    },
    {
        title: 'Обновить товар',
        path: '/admin/updateProduct',
        type: 'updateProduct',
    },

    {
        title: 'Создать категорию',
        path: '/admin/createCategory',
        type: 'createCategory',
    },

    {
        title: 'Удалить категорию',
        path: '/admin/deleteCategory',
        type: 'deleteCategory',
    },
];
