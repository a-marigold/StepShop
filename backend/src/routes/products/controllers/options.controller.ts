import type { FastifyRequest, FastifyReply } from 'fastify';

export async function getAllOptions(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const options = await request.server.prisma.option.findMany();

    return reply.code(200).send(options);
}

export async function createOption(
    request: FastifyRequest<{ Body: { id: string; name: string } }>,
    reply: FastifyReply
) {
    const { id, name } = request.body;

    const createOption = await request.server.prisma.option.create({
        data: {
            id: id,
            name: name,
        },
    });

    return reply.code(200).send(createOption);
}

export async function deleteOption(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    const id = request.params.id;

    const deleteOption = await request.server.prisma.option.delete({
        where: { id: id },
    });

    reply.code(200).send(deleteOption);
}
