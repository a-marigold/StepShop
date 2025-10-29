import type { FastifyRequest, FastifyReply } from 'fastify';

import type { CategoryType } from '@step-shop/shared/types/ProductTypes';

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

    request.server.eventEmmiter.emit('updateCategories');

    return reply.code(201).send(createCategory);
}

export async function deleteCategory(
    request: FastifyRequest<{ Params: Pick<CategoryType, 'id'> }>,

    reply: FastifyReply
) {
    const params = request.params;
    const { id } = params;

    const checkCategory = await request.server.prisma.category.findUnique({
        where: { id: id },
    });

    if (!checkCategory) {
        return reply.code(404).send({ message: 'Category was not found' });
    }

    const deleteCategory = await request.server.prisma.category.delete({
        where: { id: id },
    });

    request.server.eventEmmiter.emit('updateCategories');

    return reply.code(200).send(deleteCategory);
}
