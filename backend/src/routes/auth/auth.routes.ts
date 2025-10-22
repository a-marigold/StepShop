import type { ProvideredAppInstance } from 'src/app';

import { userSchema } from '@step-shop/shared/types/UserTypes';

import { send } from './controllers/email.controller';

export default function authRoutes(app: ProvideredAppInstance) {
    app.route({
        method: 'POST',
        url: '/auth/email/send',
        schema: {
            body: userSchema.pick({ email: true }),
        },
        handler: send,
    });
}
