import type { ProvideredAppInstance } from 'src/app';

import z from 'zod';
import { userSchema } from '@step-shop/shared/types/UserTypes';
import { ApiResponseSchema } from '@step-shop/shared/types/ApiResponseType';

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
