import type {
    ProductType,
    CurrencySymbol,
} from '@step-shop/shared/types/ProductTypes';

export interface ClientProductType extends Omit<ProductType, 'category'> {
    currencySymbol: CurrencySymbol;
    category?: ProductType['category'];
}
