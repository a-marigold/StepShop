import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import fp from 'fastify-plugin';

export default fp(async (app: FastifyInstance) => {
    app.decorate(
        'auth',
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (error) {
                reply.code(401).send({ message: 'Unauthorized' });
            }
        }
    );
});
