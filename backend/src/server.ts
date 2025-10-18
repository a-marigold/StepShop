import { buildApp } from './app';

// Binding port for render.com
const PORT = Number(process.env.PORT) || 1000;

async function start() {
    const app = await buildApp();

    try {
        await app.listen({ port: PORT, host: '0.0.0.0' });

        console.log('Server is running on local host');
    } catch (error) {
        app.log.error(error);

        process.exit(1);
    }
}

start();
