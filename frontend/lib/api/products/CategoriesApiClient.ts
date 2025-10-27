import ApiError from '@/utils/errors/ApiError';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type {
    CategoryType,
    CategoryListType,
} from '@shared/types/ProductTypes';

export async function getCategories() {
    const response = await fetch(`${apiOrigin}/products/categories`, {
        headers: {
            x_api_key: process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
    });

    if (!response.ok) {
        const responseError: ApiResponseType = await response.json();

        throw new ApiError(responseError.message);
    }

    const categories: CategoryListType = await response.json();

    return categories;
}

export async function postCategory(
    id: CategoryType['id'],

    name: CategoryType['name']
) {
    const newCategory = { id, name };

    console.log(process.env.NEXT_PUBLIC_X_API_KEY);

    const response = await fetch(`${apiOrigin}/products/categories`, {
        method: 'POST',
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? 'abc',
        },
        body: JSON.stringify(newCategory),

        cache: 'no-cache',
    });

    console.log(process.env.NEXT_PUBLIC_X_API_KEY);

    if (!response.ok) {
        const responseError: ApiResponseType = await response.json();

        throw new ApiError(responseError.message);
    }

    const data: CategoryType = await response.json();

    return data;
}

export async function deleteCategory(id: CategoryType['id']) {
    const response = await fetch(`${apiOrigin}/products/categories/${id}`, {
        method: 'DELETE',

        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
    });

    if (!response.ok) {
        const responseError: ApiResponseType = await response.json();
        throw new ApiError(responseError.message);
    }

    const data: CategoryType = await response.json();

    return data;
}
