import type { ProvideredAppInstance } from 'src/app';

import {
    getAllProducts,
    createProduct,
    deleteProduct,
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
        url: '/products',
        schema: {
            body: ProductSchema.pick({ id: true }),
            response: {
                200: { type: 'string' },
            },
        },
        handler: deleteProduct,
    });
}
