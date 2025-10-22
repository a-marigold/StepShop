import type { Dispatch, SetStateAction } from 'react';

export type UserFormType = {
    phoneNumber: {
        phoneNumber: string;
    };

    phoneCode: {
        phoneCode: string;
    };

    userData: {
        userName: string;
        userPassword: string;
    };
};

export interface UserFormProps {
    setAuthStep: Dispatch<SetStateAction<number>>;
}
