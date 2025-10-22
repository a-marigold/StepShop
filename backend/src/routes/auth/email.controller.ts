import type { FastifyRequest, FastifyReply } from 'fastify';

import type { UserType } from '@step-shop/shared/types/UserTypes';

import { sendEmailCode } from './services/email.service';

export async function send(
    request: FastifyRequest<{ Body: Pick<UserType, 'email'> }>,
    reply: FastifyReply
) {
    const { email } = request.body;

    const findEmail = request.server.prisma.user.findUnique({
        where: { email: email },
    });

    if (!!findEmail) {
        reply.code(409).send({ message: 'This email is already taken' });
    }

    sendEmailCode(email);
}
