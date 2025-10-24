import ApiError from '@/utils/errors/ApiError';
import { apiOrigin } from '@/utils/getApiOrigin';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

import type { UserType } from '@shared/types/UserTypes';

type Email = Pick<UserType, 'email'>['email'];
type UserName = Pick<UserType, 'userName'>['userName'];
type Password = Pick<UserType, 'password'>['password'];

export async function sendEmail(email: Email) {
    const prepareData = { email: email.trim() };

    const response = await fetch(`${apiOrigin}/auth/email/send`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(prepareData),
    });

    const sendEmail: ApiResponseType = await response.json();

    if (!response.ok) {
        throw new ApiError(sendEmail.message);
    }

    return sendEmail;
}

export async function verifyCode(email: Email, emailCode: string) {
    const response = await fetch(`${apiOrigin}/auth/email/verify`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },

        body: JSON.stringify({ email: email, code: emailCode }),
    });

    const verifyData: ApiResponseType = await response.json();

    if (!response.ok) {
        throw new ApiError(verifyData.message);
    }

    return verifyData;
}

export async function register(userData: {
    email: Email;
    userName: UserName;
    password: Password;
}) {
    const response = await fetch(`${apiOrigin}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

    const registerUser: ApiResponseType = await response.json();

    if (!response.ok) {
        throw new ApiError(registerUser.message);
    }
}
