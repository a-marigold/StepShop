import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { PrismaClient } from '@prisma/client';

export default fp(async function (app: FastifyInstance) {
    const prisma = new PrismaClient();

    app.decorate('prisma', prisma);

    app.addHook('onClose', () => {
        prisma.$disconnect();
    });
});
