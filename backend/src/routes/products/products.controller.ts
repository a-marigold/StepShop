import type { FastifyInstance, FastifyRequest } from 'fastify';

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
): Promise<Pick<ProductType, 'id'>> {
    const { image, title, description, price, quantity } = request.body;

    const product = await request.server.prisma.product.create({
        data: {
            image: image,

            title: title,
            description: description,

            // currencySymbol: CurrencySymbolSchema,

            price: price,
            quantity: quantity,
        },
    });
    return { id: product.id };
}
