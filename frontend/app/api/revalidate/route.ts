import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

import ApiError from '@/utils/errors/ApiError';

export default async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        if (!body.tag) {
            throw new ApiError(
                'Invalid request body. It should contain a path property',
                400
            );
        }

        revalidateTag(body.tag);

        Response.json(
            { message: `The tag ${body.tag} was successful revalidated` },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ApiError) {
            Response.json(
                { error: error.message },
                { status: Number(error.statusCode) }
            );
        }
    }
}
