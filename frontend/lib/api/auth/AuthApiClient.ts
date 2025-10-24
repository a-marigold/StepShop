import ApiError from '@/utils/errors/ApiError';
import { apiOrigin } from '@/utils/getApiOrigin';
import type { ApiResponseType } from '@shared/types/ApiResponseType';

export async function sendEmail(email: string) {
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

// export async function verifyCode()
