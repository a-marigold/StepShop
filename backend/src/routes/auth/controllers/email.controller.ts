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
    sendEmailCode(email, code);

    reply.code(200).send({ message: 'Code was sent successfully' });
}
