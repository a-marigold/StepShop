import type { CurrencySymbol } from '@/types/ProductTypes';

export interface ProductType {
    image: string;

    title: string;

    description?: string;

    price: number;

    currencySymbol: CurrencySymbol;
}
