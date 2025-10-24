import type { FastifyInstance } from 'fastify';

import productsRoutes from './products';
import authRoutes from './auth';

export async function routes(app: FastifyInstance) {
    app.register(productsRoutes);

    app.register(authRoutes);
}
