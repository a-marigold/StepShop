import type { Dispatch, SetStateAction } from 'react';

export type UserFormType = {
    email: {
        email: string;
    };

    emailCode: {
        emailCode: string;
    };

    userData: {
        userName: string;
        userPassword: string;
    };
};

export interface UserFormProps {
    setAuthStep: Dispatch<SetStateAction<number>>;
}
