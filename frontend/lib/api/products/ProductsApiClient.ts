import ApiError from '@/utils/errors/ApiError';
import type { ApiResponseType } from '@shared/types/ApiResponseType';
import { apiOrigin } from '@/utils/getApiOrigin';
import { websiteOrigin } from '@/utils/getWebsiteOrigin';

import type { ProductType } from '@shared/types/ProductTypes';

export async function serverGetProducts() {
    const response = await fetch(`${apiOrigin}/products`, {
        cache: 'force-cache',
        next: {
            tags: ['products'],
        },
    });

    if (!response.ok) {
        throw new ApiError('Internal server error');
    }

    return await response.json();
}

export async function clientGetProducts() {
    const response = await fetch(`${apiOrigin}/products`);

    if (!response.ok) {
        throw new ApiError('Internal server error');
    }

    const data = await response.json();

    return data;
}

export async function postProduct(newProduct: ProductType) {
    const response = await fetch(`${apiOrigin}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    });

    const postProduct = (await response.json()) as ApiResponseType;

    const revalidateProductsTag = await clientRevalidateTag('products');

    if (!response.ok) {
        if (!postProduct.message) {
            throw new Error('Unknown error');
        }

        throw new ApiError(
            `${postProduct.message}. ${revalidateProductsTag.message}`
        );
    }

    return postProduct;
}

export async function clientRevalidateTag(tag: string) {
    const revalidateProductsResponse = await fetch(
        `${websiteOrigin}/api/revalidate`,
        {
            method: 'POST',
            body: JSON.stringify({ tag: 'products' }),
        }
    );
    const revalidateProductsData =
        (await revalidateProductsResponse.json()) as ApiResponseType;

    if (!revalidateProductsResponse.ok) {
        if (!revalidateProductsData.message) {
            throw new Error('Unknown error');
        }

        throw new ApiError(revalidateProductsData.message);
    }

    return revalidateProductsData;
}
