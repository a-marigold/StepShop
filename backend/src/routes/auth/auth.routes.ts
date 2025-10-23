import type { ProvideredAppInstance } from 'src/app';

import { number } from 'zod';
import { userSchema } from '@step-shop/shared/types/UserTypes';

import { send, verify } from './controllers/email.controller';

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
            body: userSchema.pick({ email: true }).extend({ code: number() }),
        },
        handler: verify,
    });
}
