import ApiError from '@/utils/errors/ApiError';
import { apiOrigin } from '@/utils/getApiOrigin';

export async function clientGetProducts() {
    const response = await fetch(`${apiOrigin}/products`);

    if (!response.ok) {
        throw new ApiError('Internal server error');
    }

    const data = await response.json();

    return data;
}

export async function serverGetProducts() {}
