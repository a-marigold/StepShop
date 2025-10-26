import type { FastifyRequest, FastifyReply } from 'fastify';

import fs from 'fs';
import pump from 'pump';

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
    request: FastifyRequest<{
        Body: ProductType;
    }>,
    reply: FastifyReply
) {
    const { image, title, description, price, quantity } = request.body;

    const file = await request.file();

    let fileExtension: string;
    try {
        fileExtension = getFileExtension(file.filename);
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(400).send({ message: error.message });
        }
    }

    const imagePath = `${publicDirPath}/${title + price}${fileExtension}`;

    await pump(file.file, fs.createWriteStream(imagePath));

    const createProduct = await request.server.prisma.product.create({
        data: {
            image: `${apiOrigin}/${imagePath}`,

            title: title,
            description: description,

            price: price,
            quantity: quantity,
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
            .send({ statusCode: 404, message: 'Product is not found' });
    }

    const deleteProduct = await request.server.prisma.product.delete({
        where: {
            id: id,
        },
    });

    const imagePath = new URL(deleteProduct.image).pathname;
    await fs.promises.unlink(imagePath);

    reply.code(200).send({
        statusCode: 200,
        message: `Product has been deleted: Title - ${deleteProduct.title}; Id - ${deleteProduct.id}`,
    });
}

export async function updateProduct(
    request: FastifyRequest<{
        Body: Partial<
            Pick<ProductType, 'image' | 'title' | 'description' | 'price'>
        >;
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

    const {
        image: newImage,
        title: newTitle,
        description: newDescription,
        price: newPrice,
    } = request.body;

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

    await pump(file.file, fs.createWriteStream(newImagePath));

    const updateProduct = await request.server.prisma.product.update({
        where: {
            id: id,
        },
        data: {
            image: newImage ?? prevProduct.image,
            title: newTitle ?? prevProduct.title,
            description: newDescription ?? prevProduct.description,
            price: newPrice ?? prevProduct.price,
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
