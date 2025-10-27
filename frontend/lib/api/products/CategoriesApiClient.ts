import ApiError from '@/utils/errors/ApiError';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type {
    CategoryType,
    CategoryListType,
} from '@shared/types/ProductTypes';

//* Categories
export async function getCategories() {
    const response = await fetch(`${apiOrigin}/products/categories`, {
        headers: {
            X_API_KEY: process.env.NEXT_PUBLIC_X_API_KEY ?? '',
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

    const response = await fetch(`${apiOrigin}/products/categories`, {
        method: 'POST',
        headers: {
            X_API_KEY: process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
        body: JSON.stringify(newCategory),

        cache: 'no-cache',
    });

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
            X_API_KEY: process.env.NEXT_PUBLI_X_API_KEY ?? '',
        },
    });

    if (!response.ok) {
        const responseError: ApiResponseType = await response.json();
        throw new ApiError(responseError.message);
    }

    const data: CategoryType = await response.json();

    return data;
}
