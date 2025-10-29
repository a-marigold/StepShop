import 'fastify';
import '@fastify/jwt';

import type { FastifyRequest, FastifyReply } from 'fastify';
import type { VerifyPayloadType } from '@fastify/jwt';

import type { PrismaClient } from '@prisma/client';

import type Redis from 'ioredis';

export {};

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;

        redis: Redis;

        auth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    }
    interface FastifyRequest {
        cookies: {
            token?: string;
        };
    }

    interface FastifyRouteConfig {
        skipProductsApiKey: boolean;
    }

    interface FastifyContextConfig {
        skipProductsApiKey: boolean;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { id: string };
        user: { id: string };
    }
}
