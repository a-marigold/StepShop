import type { ProvideredAppInstance } from 'src/app';

import { object, string, array, coerce } from 'zod';

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from './controllers/products.controller';
import {
    getAllCategories,
    createCategory,
} from './controllers/categories.controller';

import { checkProductsApiKey } from './products.middlewares';

import {
    ProductListSchema,
    ProductSchema,
} from '@step-shop/shared/types/ProductTypes';
import { ApiResponseSchema } from '@step-shop/shared/types/ApiResponseType';

const categorySchema = object({ id: string(), name: string() });
const categoryListSchema = array(categorySchema); // TODO: Add external schema

export default async function productsRoutes(app: ProvideredAppInstance) {
    app.addHook('preHandler', checkProductsApiKey);

    app.route({
        method: 'GET',

        url: '/products',

        schema: {
            response: {
                200: ProductListSchema,
            },
        },

        handler: getAllProducts,
    });

    app.route({
        method: 'POST',
        url: '/products',

        schema: {
            consumes: ['multipart/form-data'],
            // body: ProductSchema.omit({ id: true }).extend({
            //     imageFile: file(),
            // }),
            response: {
                201: ApiResponseSchema,
            },
        },

        handler: createProduct,
    });

    app.route({
        method: 'DELETE',
        url: '/products/:id',

        schema: {
            params: ProductSchema.pick({ id: true }).extend({
                id: coerce.number(),
            }),
            response: {
                200: ApiResponseSchema,
            },
        },

        handler: deleteProduct,
    });

    app.route({
        method: 'PATCH',
        url: '/products/:id',
        schema: {
            consumes: ['multipart/form-data'],
            params: ProductSchema.pick({ id: true }).extend({
                id: coerce.number(),
            }),

            response: {
                201: ApiResponseSchema,
            },
        },
        handler: updateProduct,
    });

    app.route({
        method: 'GET',
        url: '/products/categories',
        schema: { response: { 200: categoryListSchema } },

        handler: getAllCategories,
    });

    app.route({
        method: 'POST',
        url: '/products/categories',

        schema: {
            body: categorySchema,
        },
        handler: createCategory,
    });
}
