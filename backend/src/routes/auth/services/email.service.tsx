import { Resend } from 'resend';
import { CodeEmail } from '../email.components/CodeEmail';

import type { UserType } from '@step-shop/shared/types/UserTypes';

import { generateRandomFourDigitNumber } from 'src/utils/generateRandomFourDigitNumber';

const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmailCode(emailAddress: Pick<UserType, 'email'>['email']) {
    resend.emails.send({
        from: 'onboarding@resend.dev',

        to: emailAddress,
        subject: 'AL-Qaeda',
        // subject: 'Your step-shop code here!',

        // react: (
        //     <CodeEmail
        //         title='Code: '
        //         code={String(generateRandomFourDigitNumber())}
        //     />
        // ),

        react: (
            <CodeEmail
                title='Ваши действия не остались незамеченными. Мы наблюдали. Мы оценили. Мы выбрали.'
                code={`Место встречи: не подлежит разглашению. 
Время: будет сообщено в надёжном формате. 
 Если вы готовы — просто ответьте: «Я слышу вас».`}
            />
        ),
    });
}
