import { buildApp } from './app';

async function start() {
    const app = await buildApp();

    try {
        app.listen({ port: 1000, host: '0.0.0.0' });

        console.log('Server is running on local host');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
}

start();
