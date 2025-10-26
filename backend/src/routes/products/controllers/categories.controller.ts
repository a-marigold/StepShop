import type { FastifyRequest, FastifyReply } from 'fastify';

export async function getAllCategories(
    request: FastifyRequest,

    reply: FastifyReply
) {
    const categories = await request.server.prisma.category.findMany();

    return reply.code(200).send(categories);
}

export async function createCategory(
    request: FastifyRequest<{ Body: { id: string; name: string } }>, // TODO: Add external type

    reply: FastifyReply
) {
    const { id, name } = request.body;

    const checkCategory = await request.server.prisma.category.findUnique({
        where: { id: id },
    });
    if (!!checkCategory) {
        return reply
            .code(409)
            .send({ message: 'Category with this id already exists' });
    }

    const createCategory = await request.server.prisma.category.create({
        data: {
            id: id,
            name: name,
        },
    });

    return reply.code(201).send(createCategory);
}
