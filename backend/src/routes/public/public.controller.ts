import type { MultipartFile } from '@fastify/multipart';
import type { FastifyRequest, FastifyReply } from 'fastify';

import { publicDirPath } from 'src/utils/getPublicDirPath';

import fs from 'fs';
import pump from 'pump';

export async function uploadImage(
    request: FastifyRequest<{ Body: { title: string; id: number } }>,
    reply: FastifyReply
) {
    const file: MultipartFile = await request.file();

    const { title, id } = request.body;

    await pump(
        file.file,
        fs.createWriteStream(`${publicDirPath}/${title + id}`),
        (error) => {
            return reply.send(500).send(error);
        }
    );

    return reply.code(201).send({ message: 'Image was created' });
}
