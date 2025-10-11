import { z } from 'zod';

export const CurrencySymbolSchema = z.union([
    z.literal('₸'),
    z.literal('₽'),
    z.literal('$'),
]);

export const ProductSchema = z
    .object({
        image: z.string(),

        title: z.string(),
        description: z.string().optional(),

        price: z.number(),
        quantity: z.number(),

        // id: z.number().optional(), // TODO: Delete optional() from this property
        id: z.number(), // TODO: Delete optional() from this property
    })
    .strict();

export const ProductListSchema = z.array(ProductSchema);

export type CurrencySymbol = z.infer<typeof CurrencySymbolSchema>;

export type ProductType = z.infer<typeof ProductSchema>;

// export type CurrencySymbol = '₸' | '₽' | '$';

// export interface ProductType {
//     image: string;

//     title: string;
//     description?: string;

//     price: number;
//     currencySymbol: CurrencySymbol;
//     quantity: number;
// }
