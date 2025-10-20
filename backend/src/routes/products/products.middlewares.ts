import type { FastifyRequest, FastifyReply } from 'fastify';

export async function checkProductsApiKey(
    request: FastifyRequest,

    reply: FastifyReply
) {
    const headers = request.headers;

    const XApiKey = headers['x-api-key'];

    if (!(XApiKey === process.env.X_API_KEY)) {
        reply.code(403).send({ message: 'Non Authorized' });
    }
}
