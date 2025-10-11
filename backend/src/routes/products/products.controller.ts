import type { FastifyRequest } from 'fastify';

import type { ProductType } from '@shared/types/ProductTypes';

export async function getAllProducts(
    request: FastifyRequest
): Promise<ProductType[]> {
    const products = await request.server.prisma.product.findMany();

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

            // currencySymbol: CurrencySymbolSchema,

            price: price,
            quantity: quantity,
        },
    });
    return `Product has been created: Title - ${createProduct.title}; Id - ${createProduct.id}`;
}

export async function deleteProduct(
    request: FastifyRequest<{
        Body: Pick<ProductType, 'id'>;
    }>
): Promise<string> {
    const { id } = request.body;

    const deleteUser = await request.server.prisma.product.delete({
        where: {
            id: id,
        },
    });

    return `Product has been deleted: Title - ${deleteUser.title}; Id - ${deleteUser.id} `;
}
