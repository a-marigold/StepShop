import z from 'zod';
export declare const userSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodCUID>;
    email: z.ZodEmail;
    userName: z.ZodString;
    password: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        user: "user";
        admin: "admin";
        creator: "creator";
    }>>;
    creationDate: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export type UserType = z.infer<typeof userSchema>;
