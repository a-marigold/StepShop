import type {
    ProductType,
    CurrencySymbol,
} from '@step-shop/shared/types/ProductTypes';

export interface ClientProductType extends ProductType {
    currencySymbol: CurrencySymbol;
}
