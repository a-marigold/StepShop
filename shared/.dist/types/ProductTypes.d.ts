import { z } from 'zod';
export declare const CurrencySymbolSchema: z.ZodUnion<readonly [z.ZodLiteral<"₸">, z.ZodLiteral<"₽">, z.ZodLiteral<"$">]>;
export declare const ProductSchema: z.ZodObject<{
    image: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    id: z.ZodNumber;
}, z.core.$strict>;
export declare const ProductListSchema: z.ZodArray<z.ZodObject<{
    image: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    id: z.ZodNumber;
}, z.core.$strict>>;
export type CurrencySymbol = z.infer<typeof CurrencySymbolSchema>;
export type ProductType = z.infer<typeof ProductSchema>;
