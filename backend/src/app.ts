import Fastify from 'fastify';

import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';

import fjwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { fastifyCookie } from '@fastify/cookie';

import prisma from './plugins/prisma';
import redis from './plugins/redis';
import auth from './plugins/auth';

import { routes } from './routes';
const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

export async function buildApp() {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(cors, {
        origin: ['https://step-shop.vercel.app', 'http://localhost:3000'],

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    });

    app.register(fastifyCookie);

    app.register(fjwt, {
        secret: process.env.JWT_SECRET,
        sign: { expiresIn: '1h' },
        cookie: { cookieName: 'token', signed: false },
    });

    app.register(prisma);
    app.register(redis);
    app.register(auth);

    app.register(routes);

    return app;
}

export type ProvideredAppInstance = typeof app;
