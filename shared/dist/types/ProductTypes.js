"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionListSchema = exports.OptionSchema = exports.CategoryListSchema = exports.CategorySchema = exports.ProductListSchema = exports.ProductSchema = exports.CurrencySymbolSchema = void 0;
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
    category: (0, zod_1.string)(),
}).strict();
exports.ProductListSchema = (0, zod_1.array)(exports.ProductSchema);
//* Categories
exports.CategorySchema = (0, zod_1.object)({ id: (0, zod_1.string)(), name: (0, zod_1.string)() });
exports.CategoryListSchema = (0, zod_1.array)(exports.CategorySchema);
//* Options
exports.OptionSchema = (0, zod_1.object)({ id: (0, zod_1.string)(), name: (0, zod_1.string)() });
exports.OptionListSchema = (0, zod_1.array)(exports.CategorySchema);
