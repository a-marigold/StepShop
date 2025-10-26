import type { ProvideredAppInstance } from 'src/app';

import { coerce, file } from 'zod';

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from './products.controller';
import { checkProductsApiKey } from './products.middlewares';

import {
    ProductListSchema,
    ProductSchema,
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
            body: ProductSchema.omit({ id: true }).extend({
                imageFile: file(),
            }),
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
            params: ProductSchema.pick({ id: true }).extend({
                id: coerce.number(),
            }),
            body: ProductSchema.pick({
                title: true,
                description: true,
                price: true,
                quantity: true,
            })
                .extend({ imageFile: file() })
                .partial(),
            response: {
                201: ApiResponseSchema,
            },
        },
        handler: updateProduct,
    });
}
