import type { ProvideredAppInstance } from 'src/app';
import z from 'zod';

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} from './products.controller';
import { ProductListSchema, ProductSchema } from '@shared/types/ProductTypes';

export default async function productsRoutes(app: ProvideredAppInstance) {
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
            body: ProductSchema,
            response: {
                200: { type: 'string' },
            },
        },

        handler: createProduct,
    });

    app.route({
        method: 'DELETE',
        url: '/products/:id',
        schema: {
            params: ProductSchema.pick({ id: true }),
            body: ProductSchema.pick({ id: true }),
            response: {
                200: { type: 'string' },
            },
        },

        handler: deleteProduct,
    });

    app.route({
        method: 'PATCH',
        url: '/products/:id',
        schema: {
            body: ProductSchema.partial().extend(
                ProductSchema.pick({ id: true })
            ),
            response: {
                200: { type: 'string' },
            },
        },
        handler: updateProduct,
    });
}
