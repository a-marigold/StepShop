import type { Dispatch, SetStateAction } from 'react';

import type { AppDispatch } from '@/redux/store';

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

export type UserFormProps = {
    setShowModal?: (showModal: boolean) => void;

    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
};
