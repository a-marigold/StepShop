import type { FastifyRequest, FastifyReply } from 'fastify';

import fs from 'fs';
import path from 'path';
import pump from 'pump';

import { uploadImage } from './services/cloudinary.service';

import { getFileExtension } from 'src/utils/getFileExtension';
import { publicDirPath } from 'src/utils/getPublicDirPath';

import { apiOrigin } from 'src/utils/getApiOrigin';

import type { ProductType } from '@step-shop/shared/types/ProductTypes';

export async function getAllProducts(
    request: FastifyRequest
): Promise<ProductType[]> {
    const products = await request.server.prisma.product.findMany();

    console.log(products);

    return products;
}

export async function createProduct(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const file = await request.file();

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
        }
    }

    const { title, price, quantity, description } = productData;
    if (!title || !price || !quantity || !description) {
        return reply
            .code(400)
            .send({ message: 'All product`s properties are required' });
    }

    const uploadResult = await uploadImage(file);

    const createProduct = await request.server.prisma.product.create({
        data: {
            image: uploadResult.secure_url,

            title: title,
            description: description,

            price: Number(price),

            quantity: Number(quantity),
        },
    });

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

    const imageUrl = new URL(deleteProduct.image);
    const imagePath = path.join(process.cwd(), imageUrl.pathname);
    await fs.promises.unlink(imagePath);

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
    const id = request.params.id;

    const file = await request.file();

    let fileExtension: string;
    try {
        fileExtension = getFileExtension(file.filename);
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(400).send({ message: error.message });
        }
    }

    let productData: Record<keyof ProductType, string>;

    for await (const part of request.parts()) {
        if (part.type === 'field' && typeof part.value === 'string') {
            productData = JSON.parse(part.value);
        } else {
            return reply.code(400).send();
        }
    }

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

    const newImagePath = `${publicDirPath}/${
        newTitle + newPrice
    }${fileExtension}`;

    const updateProduct = await request.server.prisma.product.update({
        where: {
            id: id,
        },
        data: {
            image: file.file
                ? `${apiOrigin}/public/${newTitle + newPrice}${fileExtension}`
                : prevProduct.image,
            title: newTitle ?? prevProduct.title,
            description: newDescription ?? prevProduct.description,
            price: Number(newPrice) ?? prevProduct.price,
        },
    });

    return reply.code(201).send({
        statusCode: 201,
        message: `Old product: 
${JSON.stringify(prevProduct)}; 

New product: 
${JSON.stringify(updateProduct)}`,
    });
}
