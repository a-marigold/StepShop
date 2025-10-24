import type { FastifyRequest, FastifyReply } from 'fastify';

import type { UserType } from '@step-shop/shared/types/UserTypes';

import { sendEmailCode } from '../services/email.service';
import { generateRandomFourDigitNumber } from 'src/utils/generateRandomFourDigitNumber';

export async function send(
    request: FastifyRequest<{ Body: Pick<UserType, 'email'> }>,

    reply: FastifyReply
) {
    const { email } = request.body;

    const code = String(generateRandomFourDigitNumber());

    await request.server.redis.set(`email:verify:${email}`, code, 'EX', 60 * 3);
    sendEmailCode(email, code);

    return reply.code(200).send({ message: 'Code was sent successfully' });
}

export async function verify(
    request: FastifyRequest<{
        Body: Pick<UserType, 'email'> & { code: string };
    }>,
    reply: FastifyReply
) {
    const { email, code } = request.body;

    if (!code || !email) {
        return reply.code(400).send({ message: 'Code is required' });
    }

    const trustCode = await request.server.redis.get(`email:verify:${email}`);

    if (code !== trustCode) {
        return reply.code(401).send({ message: 'Incorrect code' });
    }

    await request.server.redis.del(`email:verify:${email}`);

    await request.server.redis.set(
        `email:verified:${email}`,
        'true',
        'EX',
        60 * 5
    );

    return reply.code(200).send({ message: 'Success. Code is trust' });
}

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

    const createUser = await request.server.prisma.user.create({
        data: {
            email: email,
            userName: userName,
            password: password,
            role: 'user',
        },
    });

    const token = request.server.jwt.sign({ id: createUser.id });

    return reply.code(200).setCookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
    });
}
