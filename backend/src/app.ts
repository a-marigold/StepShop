import Fastify from 'fastify';

import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import {
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';

import prismaPlugin from './plugins/prisma';

import { routes } from './routes';

const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

export async function buildApp() {
    app.register(prismaPlugin);

    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(routes);

    return app;
}

export type ProvideredAppInstance = typeof app;
