import type { FastifyInstance } from 'fastify';

import productsRoutes from './products';

export async function routes(app: FastifyInstance) {
    app.register(productsRoutes);
}
