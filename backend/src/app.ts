import Fastify from 'fastify';

import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
    validatorCompiler,
    serializerCompiler,
} from 'fastify-type-provider-zod';

import fjwt from '@fastify/jwt';
import cors from '@fastify/cors';

import { fastifyCookie } from '@fastify/cookie';

import fastifyMultipart from '@fastify/multipart';

import prisma from './plugins/prisma';
import redis from './plugins/redis';
import auth from './plugins/auth';
import eventEmmiter from './plugins/eventEmmiter';

import { routes } from './routes';
const app = Fastify({
    logger: true,
}).withTypeProvider<ZodTypeProvider>();

export async function buildApp() {
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);

    app.register(fastifyCookie, { hook: 'onRequest' });

    app.register(cors, {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (
                origin === 'https://step-shop.vercel.app' ||
                origin === 'http://localhost:3000'
            ) {
                return callback(null, true);
            } else {
                return callback(new Error('Origin is not allowed'), false);
            }
        },

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    });

    app.register(fjwt, {
        secret: process.env.JWT_SECRET,
        sign: { expiresIn: '1h' },
        cookie: { cookieName: 'token', signed: false },
    });

    app.register(fastifyMultipart);
    app.register(eventEmmiter);

    app.register(prisma);
    app.register(redis);
    app.register(auth);
    app.register(routes);

    return app;
}

export type ProvideredAppInstance = typeof app;
