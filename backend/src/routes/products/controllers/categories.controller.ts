import type { FastifyRequest, FastifyReply } from 'fastify';

export async function getAllCategories(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const categories = await request.server.prisma.category.findMany();

    return reply.code(200).send(categories);
}
