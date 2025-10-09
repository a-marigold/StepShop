import type { ProductType } from '@shared/types/ProductTypes';

export async function getAllProducts(): Promise<ProductType[]> {
    return [
        {
            title: 'Example product',
            image: '',
            description: 'This product description',
            price: 10,
            currencySymbol: '₸',
            quantity: 1,
        },
    ];
}
