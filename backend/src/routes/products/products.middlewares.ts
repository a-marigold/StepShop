import type { FastifyRequest, FastifyReply } from 'fastify';

export async function checkProductsApiKey(
    request: FastifyRequest,

    reply: FastifyReply
) {
    if (request.routeOptions.config.skipProductsApiKey) return;

    const headers = request.headers;

    const XApiKey = headers['x-api-key'];

    if (!(XApiKey === process.env.X_API_KEY)) {
        reply.code(403).send({ message: 'Non Authorized' });
    }
}
