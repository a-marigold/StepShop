import type { FastifyRequest, FastifyReply } from 'fastify';

import {
    uploadImage,
    destroyImage,
    updateImage,
} from '../services/cloudinary.service';

import { getFileExtension } from 'src/utils/getFileExtension';

import type { MultipartFile } from '@fastify/multipart';
import type { ProductType } from '@step-shop/shared/types/ProductTypes';

export async function getAllProducts(
    request: FastifyRequest
): Promise<ProductType[]> {
    const products = await request.server.prisma.product.findMany();

    return products;
}

export async function createProduct(
    request: FastifyRequest,

    reply: FastifyReply
) {
    let file: MultipartFile;

    let productData: Record<keyof ProductType, string>;

    for await (const part of request.parts()) {
        if (part.type === 'field') {
            if (
                part.fieldname === 'product' &&
                typeof part.value === 'string'
            ) {
                productData = JSON.parse(part.value);
            } else {
                return reply.code(400).send();
            }
        } else if (part.type === 'file') {
            file = part;
        } else {
            continue;
        }
    }

    if (!file) {
        return reply.code(400).send({ message: 'Image is required' });
    }

    let fileExtension: string;
    try {
        fileExtension = getFileExtension(file.filename);
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(400).send({ message: error.message });
        }
    }

    const { title, price, quantity, description } = productData;
    if (!title || !price || !quantity) {
        return reply
            .code(400)
            .send({ message: 'All product`s properties are required' });
    }

    const uploadResult = await uploadImage(file);

    await request.server.prisma.image.create({
        data: {
            url: uploadResult.secure_url,
            id: uploadResult.public_id,
        },
    });

    const createProduct = await request.server.prisma.product.create({
        data: {
            image: uploadResult.secure_url,

            title: title,
            description: description,

            price: Number(price),

            quantity: Number(quantity),
        },
    });

    request.server.eventEmmiter.emit('updateProducts');

    return reply.code(201).send({
        statusCode: 201,
        message: `Product has been created: Title - ${createProduct.title}; Id - ${createProduct.id}`,
    });
}

export async function deleteProduct(
    request: FastifyRequest<{
        Params: Pick<ProductType, 'id'>;
    }>,

    reply: FastifyReply
) {
    const id = request.params.id;

    const product = await request.server.prisma.product.findUnique({
        where: { id: id },
    });

    if (!product) {
        throw reply
            .code(404)
            .send({ statusCode: 404, message: 'Product was not found' });
    }

    const deleteProduct = await request.server.prisma.product.delete({
        where: {
            id: id,
        },
    });

    const productImage = deleteProduct.image;

    const deleteImage = await request.server.prisma.image.delete({
        where: { url: productImage },
    });

    await destroyImage(deleteImage.id);

    request.server.eventEmmiter.emit('updateProducts');

    reply.code(200).send({
        statusCode: 200,
        message: `Product has been deleted: Title - ${deleteProduct.title}; Id - ${deleteProduct.id}`,
    });
}

export async function updateProduct(
    request: FastifyRequest<{
        Params: Pick<ProductType, 'id'>;
    }>,

    reply: FastifyReply
) {
    let file: MultipartFile | undefined = undefined;

    let productData: Record<keyof ProductType, string>;

    for await (const part of request.parts()) {
        if (part.type === 'field') {
            if (
                part.fieldname === 'product' &&
                typeof part.value === 'string'
            ) {
                productData = JSON.parse(part.value);
            }
        } else if (part.type === 'file') {
            file = part;
        } else {
            return reply.code(400).send();
        }
    }

    let fileExtension: string | undefined = undefined;
    if (file) {
        try {
            fileExtension = getFileExtension(file.filename);
        } catch (error) {
            if (error instanceof Error) {
                return reply.code(400).send({ message: error.message });
            }
        }
    }

    const id = request.params.id;
    const {
        title: newTitle,
        description: newDescription,
        price: newPrice,
    } = productData;

    const prevProduct = await request.server.prisma.product.findUnique({
        where: { id: id },
    });

    if (!prevProduct) {
        return reply
            .code(404)

            .send({ message: `Product with {id: ${id}} is not found` });
    }
    const { id: prevImageId } = await request.server.prisma.image.findUnique({
        where: { url: prevProduct.image },
    });

    let newImageUrl: string | undefined = undefined;
    if (file) {
        const uploadNewImage = await updateImage(prevImageId, file);

        const updateImageRecord = await request.server.prisma.image.update({
            where: { url: prevProduct.image },

            data: {
                url: uploadNewImage.secure_url,
                id: uploadNewImage.public_id,
            },
        });

        newImageUrl = updateImageRecord.url;
    }

    const updateProduct = await request.server.prisma.product.update({
        where: {
            id: id,
        },

        data: {
            image: newImageUrl ?? prevProduct.image,
            title: newTitle ?? prevProduct.title,
            description: newDescription ?? prevProduct.description,
            price: Number(newPrice) && prevProduct.price,
        },
    });

    request.server.eventEmmiter.emit('updateProducts');

    return reply.code(201).send({
        statusCode: 201,

        message: `Old product: 

${JSON.stringify(prevProduct)};

New product: 

${JSON.stringify(updateProduct)}`,
    });
}

export async function getProductsStream(
    request: FastifyRequest,

    reply: FastifyReply
) {
    reply.raw.setHeader('Access-Control-Allow-Origin', request.headers.origin);
    reply.raw.setHeader('Access-Control-Allow-Credentials', 'true');

    reply.raw.setHeader('Content-Type', 'text/event-stream');
    reply.raw.setHeader('Cache-Control', 'no-cache');

    reply.raw.setHeader('Connection', 'keep-alive');

    reply.raw.flushHeaders();

    const products = await request.server.prisma.product.findMany();

    reply.raw.write('event: updateProducts\n');
    reply.raw.write(`id: ${Date.now()}\n`);
    reply.raw.write(`data: ${JSON.stringify(products)}\n\n`);

    const categories = await request.server.prisma.category.findMany();

    reply.raw.write('event: updateCategories\n');
    reply.raw.write(`id: ${Date.now()}\n`);
    reply.raw.write(`data: ${JSON.stringify(categories)}\n\n`);

    const pingInterval = setInterval(() => {
        reply.raw.write('event: ping\n');

        reply.raw.write(`id: ${Date.now()}\n\n`);
    }, 1000 * 30);

    request.server.eventEmmiter.on('updateProducts', async () => {
        const products = await request.server.prisma.product.findMany();

        reply.raw.write('event: updateProducts\n');
        reply.raw.write(`id: ${Date.now()}\n`);
        reply.raw.write(`data: ${JSON.stringify(products)}\n\n`);
    });

    request.server.eventEmmiter.on('updateCategories', async () => {
        const categories = await request.server.prisma.category.findMany();

        reply.raw.write('event: updateCategories\n');
        reply.raw.write(`id: ${Date.now()}\n`);
        reply.raw.write(`data: ${JSON.stringify(categories)}\n\n`);
    });

    reply.raw.on('close', () => {
        clearInterval(pingInterval);
    });
}
