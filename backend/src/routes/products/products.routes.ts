import type { FastifyInstance } from 'fastify';
import { getAllProducts } from './products.controller';

import type { ProductType } from '@shared/types/ProductTypes';

export default async function productsRoutes(app: FastifyInstance) {
    app.get<{ Reply: ProductType[] }>('/', getAllProducts);
}
