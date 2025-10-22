import z from 'zod';

const userRoleSchema = z.enum(['user', 'admin', 'creator']);

export const userSchema = z.object({
    id: z.cuid().optional(),

    email: z.email(),

    userName: z.string(),

    password: z.string(),

    role: userRoleSchema.optional(),

    creationDate: z.date().optional(),
});
export type UserType = z.infer<typeof userSchema>;
