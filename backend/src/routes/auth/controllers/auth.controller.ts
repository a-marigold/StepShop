import type { FastifyRequest, FastifyReply } from 'fastify';

import type { UserType } from '@step-shop/shared/types/UserTypes';

export async function register(
    request: FastifyRequest<{
        Body: Pick<UserType, 'email' | 'userName' | 'password'>;
    }>,
    reply: FastifyReply
) {
    const { email, userName, password } = request.body;

    const checkEmail = await request.server.redis.get(
        `email:verified:${email}`
    );
    if (checkEmail !== 'true') {
        return reply.code(401).send({ message: 'Email is not verified!' });
    }

    const findUser = await request.server.prisma.user.findUnique({
        where: { email: email },
    });
    if (!!findUser) {
        return reply
            .code(409)
            .send({ message: 'User with this email already exists' });
    }

    const createUser = await request.server.prisma.user.create({
        data: {
            email: email,
            userName: userName,
            password: password,
            role: 'user',
        },
    });

    const token = request.server.jwt.sign({ id: createUser.id });

    return reply
        .code(200)

        .setCookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            domain: '.onrender.com',
            maxAge: 3600,
        })

        .send();
}

export async function me(
    request: FastifyRequest<{ Headers: { token: string } }>,
    reply: FastifyReply
) {
    const userId = request.user.id;

    const user = await request.server.prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        return reply.code(404).send({ message: 'User was not found' });
    }

    return reply.code(200).send(user);
}
