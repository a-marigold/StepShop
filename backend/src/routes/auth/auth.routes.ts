import type { ProvideredAppInstance } from 'src/app';

import z from 'zod';
import { userSchema } from '@step-shop/shared/types/UserTypes';

import { sendCode } from './email.controller';

export default function authRoutes(app: ProvideredAppInstance) {
    app.route({
        method: 'POST',
        url: '/auth/phone/send',
        schema: {
            body: userSchema.pick({ phoneNumber: true }),
            response: {
                // 200: z.,
            },
        },
        handler: sendCode,
    });
}
