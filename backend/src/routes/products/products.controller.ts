import type { FastifyInstance, FastifyRequest } from 'fastify';

import type { ProductType } from '@shared/types/ProductTypes';

export async function getAllProducts(
    request: FastifyRequest
): Promise<ProductType[]> {
    const products = await request.server.prisma.product.findMany();

    return products;
}
