import type { ProvideredAppInstance } from 'src/app';

import { coerce } from 'zod';

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductsStream,
} from './controllers/products.controller';

import {
    getAllCategories,
    createCategory,
    deleteCategory,
} from './controllers/categories.controller';

import {
    getAllOptions,
    createOption,
    deleteOption,
} from './controllers/options.controller';

import { checkProductsApiKey } from './products.middlewares';

import {
    ProductListSchema,
    ProductSchema,
    CategorySchema,
    CategoryListSchema,
    OptionSchema,
    OptionListSchema,
} from '@step-shop/shared/types/ProductTypes';
import { ApiResponseSchema } from '@step-shop/shared/types/ApiResponseType';

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
        schema: { response: { 200: CategoryListSchema } },

        handler: getAllCategories,
    });

    app.route({
        method: 'POST',

        url: '/products/categories',

        schema: {
            body: CategorySchema,
        },
        handler: createCategory,
    });

    app.route({
        method: 'DELETE',

        url: '/products/categories/:id',

        schema: {
            params: CategorySchema.pick({ id: true }),
        },
        handler: deleteCategory,
    });

    app.route({
        method: 'GET',
        url: '/products/stream',
        schema: {
            // body: _,
            // response: {
            //     200: _RESPONSE__SCHEMA_,
            // },
        },
        config: { skipProductsApiKey: true },
        handler: getProductsStream,
    });

    app.route({
        method: 'GET',
        url: '/products/options',

        schema: {
            response: {
                200: OptionListSchema,
            },
        },

        handler: getAllOptions,
    });

    app.route({
        method: 'POST',
        url: '/products/options',

        schema: {
            body: OptionSchema,
        },

        handler: createOption,
    });

    app.route({
        method: 'DELETE',
        url: '/products/options/:id',

        schema: {
            params: OptionSchema.pick({ id: true }),
        },

        handler: deleteOption,
    });
}
