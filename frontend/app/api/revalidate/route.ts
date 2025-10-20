import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

import ApiError from '@/utils/errors/ApiError';

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        if (!body.tag) {
            throw new ApiError(
                'Invalid request body. It should contain a path property',
                400
            );
        }

        revalidateTag(body.tag);

        return Response.json(
            { message: `The tag ${body.tag} was successfully revalidated` },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ApiError) {
            return Response.json(
                { message: error.message },
                { status: Number(error.statusCode) }
            );
        }

        if (error instanceof ApiError) {
            return Response.json({
                message: 'Internal Server Error',
                status: 500,
            });
        }
    }
}
