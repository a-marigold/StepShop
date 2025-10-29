import EventEmitter from 'events';

import type { FastifyInstance } from 'fastify';

import fp from 'fastify-plugin';

export default fp(async function (app: FastifyInstance) {
    const eventEmmiter = new EventEmitter();

    app.decorate('eventEmmiter', eventEmmiter);
});
