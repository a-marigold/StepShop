import type { FastifyInstance } from 'fastify';

import prisma from './prisma';
import redis from './redis';
import auth from './auth';

export default async function plugins(app: FastifyInstance) {
    app.register(prisma);
    app.register(redis);
    app.register(auth);
}
