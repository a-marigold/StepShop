import {
    union,
    literal,
    object,
    string,
    number,
    array,
    infer as zinfer,
} from 'zod';

export const CurrencySymbolSchema = union([
    literal('₸'),
    literal('₽'),
    literal('$'),
]);

export const ProductSchema = object({
    image: string(),

    title: string(),
    description: string().nullable(),

    price: number(),
    quantity: number(),

    id: number(),
}).strict();

export const ProductListSchema = array(ProductSchema);

export type CurrencySymbol = zinfer<typeof CurrencySymbolSchema>;

export type ProductType = zinfer<typeof ProductSchema>;

export const categorySchema = object({ id: string(), name: string() });

export const categoryListSchema = array(categorySchema);

export type CategoryType = zinfer<typeof categorySchema>;

export type CategoryListType = zinfer<typeof categoryListSchema>;
