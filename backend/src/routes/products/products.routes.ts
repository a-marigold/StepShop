import type { FastifyInstance } from 'fastify';
import { getAllProducts, createProduct } from './products.controller';

import { ProductListSchema, ProductSchema } from '@shared/types/ProductTypes';

export default async function productsRoutes(app: FastifyInstance) {
    app.get(
        '/products',
        {
            schema: {
                response: {
                    200: ProductListSchema,
                },
            },
        },
        getAllProducts
    );

    app.post(
        '/products',
        {
            schema: {
                body: ProductSchema,
            },
        },
        createProduct
    );
}
