export type CurrencySymbol = '₸' | '₽' | '$';

export interface ProductType {
    image: string;

    title: string;

    description?: string;

    price: number;

    currencySymbol: CurrencySymbol;

    // TODO: Add required for quantity

    quantity?: number;
}
