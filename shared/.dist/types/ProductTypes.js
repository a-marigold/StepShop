"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductListSchema = exports.ProductSchema = exports.CurrencySymbolSchema = void 0;
var zod_1 = require("zod");
exports.CurrencySymbolSchema = zod_1.z.union([
    zod_1.z.literal('₸'),
    zod_1.z.literal('₽'),
    zod_1.z.literal('$'),
]);
exports.ProductSchema = zod_1.z
    .object({
    image: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    id: zod_1.z.number(),
})
    .strict();
exports.ProductListSchema = zod_1.z.array(exports.ProductSchema);
// export type CurrencySymbol = '₸' | '₽' | '$';
// export interface ProductType {
//     image: string;
//     title: string;
//     description?: string;
//     price: number;
//     currencySymbol: CurrencySymbol;
//     quantity: number;
// }
