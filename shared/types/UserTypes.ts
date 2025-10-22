import z from 'zod';

const userRoleSchema = z.enum(['user', 'admin', 'creator']);

export const userSchema = z.object({
    id: z.cuid(),

    email: z.email(),

    username: z.string(),

    password: z.string(),

    role: userRoleSchema,

    creationDate: z.date(),
});
export type UserType = z.infer<typeof userSchema>;
