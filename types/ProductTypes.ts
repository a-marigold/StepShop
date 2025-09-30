export type CurrencySymbol = '₸' | '₽' | '$';

export interface ProductType {
    image: string;

    title: string;
    description?: string;

    price: number;
    currencySymbol: CurrencySymbol;
    quantity?: number;
}
