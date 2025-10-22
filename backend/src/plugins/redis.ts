import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import Redis from 'ioredis';

export default fp(async function (app: FastifyInstance) {
    const redis = new Redis(process.env.REDIS_URL);

    app.decorate('redis', redis);

    app.addHook('onClose', async () => {
        await app.redis.quit();
    });
});
