import ApiError from '@/utils/errors/ApiError';

import { apiOrigin } from '@/utils/getApiOrigin';

import { OptionType } from '@shared/types/ProductTypes';

// TODO: Add create, delete operations

export async function getOptions() {
    const response = await fetch(`${apiOrigin}/products/options`, {
        headers: { 'x-api-key': process.env.X_API_KEY ?? '' },
    });
    if (!response.ok) {
        throw new ApiError('Internal server error');
    }
    const data = await response.json();

    return data;
}
