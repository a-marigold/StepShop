import Fastify from 'fastify';

import { routes } from './routes';

export async function buildApp() {
    const app = Fastify({ logger: true });

    app.register(routes);

    return app;
}
