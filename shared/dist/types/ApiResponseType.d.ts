import z from 'zod';
export declare const ApiResponseSchema: z.ZodObject<{
    statusCode: z.ZodNumber;
    message: z.ZodString;
}, z.core.$strip>;
export type ApiResponseType = z.infer<typeof ApiResponseSchema>;
