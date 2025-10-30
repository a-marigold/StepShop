import ApiError from '@/utils/errors/ApiError';

import type { ApiResponseType } from '@shared/types/ApiResponseType';

import { apiOrigin } from '@/utils/getApiOrigin';
import { websiteOrigin } from '@/utils/getWebsiteOrigin';

import type {
    ProductType,
    CategoryType,
    CategoryListType,
} from '@shared/types/ProductTypes';

export async function serverGetProducts() {
    const response = await fetch(`${apiOrigin}/products`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
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
    const response = await fetch(`${apiOrigin}/products`, {
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
    });

    if (!response.ok) {
        throw new ApiError('Internal server error');
    }

    const data = await response.json();

    return data;
}

export async function postProduct(newProduct: ProductType, imageFile: File) {
    const formData = new FormData();

    formData.append('imageFile', imageFile);

    formData.append('product', JSON.stringify(newProduct));

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    const response = await fetch(`${apiOrigin}/products`, {
        method: 'POST',
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
        body: formData,
    });

    const postProduct: ApiResponseType = await response.json();

    if (!response.ok) {
        if (!postProduct.message) {
            throw new ApiError('Unknown error');
        }

        throw new ApiError(postProduct.message);
    }

    const revalidateProductsTag = await clientRevalidateTag('products');

    return postProduct;
}

export async function deleteProduct(id: Pick<ProductType, 'id'>['id']) {
    const response = await fetch(`${apiOrigin}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
    });

    const deleteProduct: ApiResponseType = await response.json();

    if (!response.ok) {
        if (!deleteProduct.message) {
            throw new ApiError('Unknown error');
        }

        throw new ApiError(deleteProduct.message);
    }

    const revalidateProductsTag = await clientRevalidateTag('products');

    return deleteProduct;
}

export async function patchProduct(newProduct: ProductType, imageFile: File) {
    const formData = new FormData();

    formData.append('imageFile', imageFile);
    formData.append('product', JSON.stringify(newProduct));

    console.log(imageFile);
    console.log(JSON.stringify(newProduct));

    const response = await fetch(`${apiOrigin}/products/${newProduct.id}`, {
        method: 'PATCH',
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY ?? '',
        },
        body: formData,
    });
    const updateProduct: ApiResponseType = await response.json();

    if (!response.ok) {
        if (!updateProduct.message) {
            throw new ApiError(updateProduct.message);
        }

        throw new ApiError(updateProduct.message);
    }

    const revalidateProductsTag = await clientRevalidateTag('products');

    return updateProduct;
}

export async function clientRevalidateTag(tag: string) {
    const revalidateProductsResponse = await fetch(
        `${websiteOrigin}/api/revalidate`,
        {
            method: 'POST',

            body: JSON.stringify({ tag: tag }),
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
