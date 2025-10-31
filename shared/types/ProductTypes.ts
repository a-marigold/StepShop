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

    category: string(),
}).strict();

export const ProductListSchema = array(ProductSchema);

export type CurrencySymbol = zinfer<typeof CurrencySymbolSchema>;
export type ProductType = zinfer<typeof ProductSchema>;

//* Categories
export const CategorySchema = object({ id: string(), name: string() });
export const CategoryListSchema = array(CategorySchema);

export type CategoryType = zinfer<typeof CategorySchema>;
export type CategoryListType = zinfer<typeof CategoryListSchema>;
