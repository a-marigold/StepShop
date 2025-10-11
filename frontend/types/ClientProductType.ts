import type { ProductType, CurrencySymbol } from '@shared/types/ProductTypes';

export interface ClientProductType extends ProductType {
    currencySymbol: CurrencySymbol;
}
