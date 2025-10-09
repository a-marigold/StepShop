import type { FastifyInstance } from 'fastify';
import { getAllProducts } from './products.controller';

export default async function productsRoutes(app: FastifyInstance) {
    app.get('/', getAllProducts);
}
