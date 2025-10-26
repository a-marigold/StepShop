import type { ProvideredAppInstance } from 'src/app';

import { uploadImage } from './public.controller';

export default async function publicRoutes(app: ProvideredAppInstance) {
    app.route({
        method: 'POST',
        url: '/public',
        schema: {
            consumes: ['multipart/form-data'],
            body: {
                type: 'object',

                properties: {
                    title: { type: 'string' },
                    file: { type: 'string', format: 'binary' },
                },
                required: ['file'],
            },
        },
        handler: uploadImage,
    });
}
