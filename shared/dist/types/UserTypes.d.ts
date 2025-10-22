import z from 'zod';
export declare const userSchema: z.ZodObject<{
    id: z.ZodCUID;
    phoneNumber: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    role: z.ZodEnum<{
        user: "user";
        admin: "admin";
        creator: "creator";
    }>;
    creationDate: z.ZodDate;
}, z.core.$strip>;
export type UserType = z.infer<typeof userSchema>;
