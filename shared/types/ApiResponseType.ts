import z from 'zod';

const ApiResponseSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;
