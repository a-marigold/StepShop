import type { FastifyRequest, FastifyReply } from 'fastify';

import type { ProductType } from '@shared/types/ProductTypes';

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
    }>
): Promise<string> {
    const { image, title, description, price, quantity } = request.body;

    const createProduct = await request.server.prisma.product.create({
        data: {
            image: image,

            title: title,
            description: description,

            price: price,
            quantity: quantity,
        },
    });

    return `Product has been created: Title - ${createProduct.title}; Id - ${createProduct.id}`;
}

export async function deleteProduct(
    request: FastifyRequest<{
        Params: Pick<ProductType, 'id'>;
    }>
): Promise<string> {
    const { id } = request.params;

    const deleteUser = await request.server.prisma.product.delete({
        where: {
            id: id,
        },
    });

    return `Product has been deleted: Title - ${deleteUser.title}; Id - ${deleteUser.id}`;
}

export async function updateProduct(
    request: FastifyRequest<{
        Body: Partial<
            Pick<ProductType, 'image' | 'title' | 'description' | 'price'>
        >;
        Params: Pick<ProductType, 'id'>;
    }>,
    reply: FastifyReply
): Promise<string> {
    const id = request.params.id;

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
        throw reply
            .code(404)
            .send({ message: `Product with {id: ${id}} is not found` });
    }

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

    return `Old product values: ${JSON.stringify(
        prevProduct
    )}; New product values: ${JSON.stringify(updateProduct)}`;
}
