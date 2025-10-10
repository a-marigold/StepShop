import type { FastifyInstance } from 'fastify';
import { getAllProducts } from './products.controller';

import { ProductListSchema } from '@shared/types/ProductTypes';

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
}
