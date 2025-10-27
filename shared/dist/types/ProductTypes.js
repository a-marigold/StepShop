"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryListSchema = exports.categorySchema = exports.ProductListSchema = exports.ProductSchema = exports.CurrencySymbolSchema = void 0;
var zod_1 = require("zod");
exports.CurrencySymbolSchema = (0, zod_1.union)([
    (0, zod_1.literal)('₸'),
    (0, zod_1.literal)('₽'),
    (0, zod_1.literal)('$'),
]);
exports.ProductSchema = (0, zod_1.object)({
    image: (0, zod_1.string)(),
    title: (0, zod_1.string)(),
    description: (0, zod_1.string)().nullable(),
    price: (0, zod_1.number)(),
    quantity: (0, zod_1.number)(),
    id: (0, zod_1.number)(),
}).strict();
exports.ProductListSchema = (0, zod_1.array)(exports.ProductSchema);
exports.categorySchema = (0, zod_1.object)({ id: (0, zod_1.string)(), name: (0, zod_1.string)() });
exports.categoryListSchema = (0, zod_1.array)(exports.categorySchema);
