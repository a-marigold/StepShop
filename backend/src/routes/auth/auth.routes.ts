import type { ProvideredAppInstance } from 'src/app';

import { object, string } from 'zod';

import { userSchema } from '@step-shop/shared/types/UserTypes';

import { send, verify } from './controllers/email.controller';

import { register, me } from './controllers/auth.controller';

export default function authRoutes(app: ProvideredAppInstance) {
    app.route({
        method: 'POST',
        url: '/auth/email/send',
        schema: {
            body: userSchema.pick({ email: true }),
        },
        handler: send,
    });

    app.route({
        method: 'POST',
        url: '/auth/email/verify',
        schema: {
            body: userSchema.pick({ email: true }).extend({ code: string() }),
        },
        handler: verify,
    });

    app.route({
        method: 'POST',
        url: '/auth/register',
        schema: {
            body: userSchema.pick({
                email: true,
                userName: true,
                password: true,
            }),
        },
        handler: register,
    });

    app.route({
        method: 'GET',
        url: 'auth/me',
        schema: {
            headers: object({ token: string() }),
        },
        onRequest: [app.auth],
        handler: me,
    });
}
