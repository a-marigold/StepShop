import type { FastifyInstance } from 'fastify';

import zodToJsonSchema from 'zod-to-json-schema';

import { getAllProducts, createProduct } from './products.controller';

import { ProductListSchema, ProductSchema } from '@shared/types/ProductTypes';

export default async function productsRoutes(app: FastifyInstance) {
    app.route({
        method: 'GET',

        url: '/products',

        schema: {
            response: {
                200: zodToJsonSchema(ProductListSchema),
            },
        },
        handler: getAllProducts,
    });

    app.route({
        method: 'POST',
        url: '/products',
        schema: {
            body: zodToJsonSchema(ProductSchema),
            response: {
                200: zodToJsonSchema(ProductSchema.pick({ id: true })),
            },
        },
        handler: createProduct,
    });
}
