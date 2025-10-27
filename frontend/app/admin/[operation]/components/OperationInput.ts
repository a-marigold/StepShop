import type { CategoryType } from '@shared/types/ProductTypes';
import type { ProductType } from '@shared/types/ProductTypes';

export type OperationInput = {
    name: string;

    propertyName: keyof Omit<ProductType, 'image'>;

    htmlId: string;

    isRequired: boolean;

    errorMessage?: string;
};

export type CategoryOperationInput = {
    name: string;
    propertyName: keyof CategoryType;

    htmlId: string;

    isRequired: boolean;

    errorMessage?: string;
};
