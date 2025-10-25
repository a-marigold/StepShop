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
        credentials: 'include',
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
        credentials: 'include',
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

export async function clientGetUserData() {
    const response = await fetch(`${apiOrigin}/auth/me`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        const responseError: ApiResponseType = await response.json();
        throw new ApiError(responseError.message);
    }

    // TODO: Add general type with server for user without password
    const userData: UserType = await response.json();

    return userData;
}

export async function serverGetUserData(token: string, error: Error) {
    const response = await fetch(`${apiOrigin}/auth/me`, {
        method: 'GET',
        headers: {
            Cookie: `token=${token}`,
        },
    });

    if (!response.ok) {
        throw error;
    }

    const userData: UserType = await response.json();

    return userData;
}
