import 'fastify';

import type { FastifyRequest, FastifyReply } from 'fastify';

import type { PrismaClient } from '@prisma/client';

import type Redis from 'ioredis';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;

        redis: Redis;

        auth(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    }

    interface FastifyRequest {
        user: {
            id: string;
        };
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { id: string };
        user: { id: string };
    }
}
