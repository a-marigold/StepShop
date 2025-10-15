import type { ProductType } from '@shared/types/ProductTypes';

export type OperationInput = {
    name: string;
    propertyName: keyof ProductType;

    htmlId: string;

    isRequired: boolean;
    errorMessage?: string;
};
