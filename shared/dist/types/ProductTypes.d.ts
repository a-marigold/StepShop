import { infer as zinfer } from 'zod';
export declare const CurrencySymbolSchema: import("zod").ZodUnion<readonly [import("zod").ZodLiteral<"₸">, import("zod").ZodLiteral<"₽">, import("zod").ZodLiteral<"$">]>;
export declare const ProductSchema: import("zod").ZodObject<{
    image: import("zod").ZodString;
    title: import("zod").ZodString;
    description: import("zod").ZodNullable<import("zod").ZodString>;
    price: import("zod").ZodNumber;
    quantity: import("zod").ZodNumber;
    id: import("zod").ZodNumber;
    category: import("zod").ZodString;
}, import("zod/v4/core").$strict>;
export declare const ProductListSchema: import("zod").ZodArray<import("zod").ZodObject<{
    image: import("zod").ZodString;
    title: import("zod").ZodString;
    description: import("zod").ZodNullable<import("zod").ZodString>;
    price: import("zod").ZodNumber;
    quantity: import("zod").ZodNumber;
    id: import("zod").ZodNumber;
    category: import("zod").ZodString;
}, import("zod/v4/core").$strict>>;
export type CurrencySymbol = zinfer<typeof CurrencySymbolSchema>;
export type ProductType = zinfer<typeof ProductSchema>;
export declare const CategorySchema: import("zod").ZodObject<{
    id: import("zod").ZodString;
    name: import("zod").ZodString;
}, import("zod/v4/core").$strip>;
export declare const CategoryListSchema: import("zod").ZodArray<import("zod").ZodObject<{
    id: import("zod").ZodString;
    name: import("zod").ZodString;
}, import("zod/v4/core").$strip>>;
export type CategoryType = zinfer<typeof CategorySchema>;
export type CategoryListType = zinfer<typeof CategoryListSchema>;
