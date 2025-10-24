import type { Dispatch, SetStateAction } from 'react';

import type { UserType } from '@shared/types/UserTypes';

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

export type UserFormProps =
    | {
          setAuthStep: Dispatch<SetStateAction<number>>;
          setShowModal?: (showModal: boolean) => void;

          isLoading: boolean;
          setIsLoading: Dispatch<SetStateAction<boolean>>;
      }
    | {
          setAuthStep?: Dispatch<SetStateAction<number>>;
          setShowModal: (showModal: boolean) => void;

          isLoading: boolean;
          setIsLoading: Dispatch<SetStateAction<boolean>>;
      };
