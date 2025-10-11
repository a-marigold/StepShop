import Fastify from 'fastify';

import { ZodTypeProvider } from 'fastify-type-provider-zod';

import prismaPlugin from './plugins/prisma';

import { routes } from './routes';

export async function buildApp() {
    const app = Fastify({
        logger: true,
    }).withTypeProvider<ZodTypeProvider>();

    app.register(prismaPlugin);

    app.register(routes);

    return app;
}
