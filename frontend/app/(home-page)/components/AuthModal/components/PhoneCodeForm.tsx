'use client';

import { Controller, useForm } from 'react-hook-form';

import { apiOrigin } from '@/utils/getApiOrigin';

import type { UserFormType } from './UserFormType';

import UserForm from './UserForm';
import CodeInput from '@UI/CodeInput';

export default function PhoneCodeForm() {
    const { control, handleSubmit } = useForm<UserFormType['phoneCode']>();

    async function submit(data: UserFormType['phoneCode']) {
        const response = await fetch(`${apiOrigin}/AUTH_ENDPOINT    `);
    }

    return (
        // <form className={authStyles['user-form']}>
        //     <div className={authStyles['content-block']}>
        //         <div className={authStyles['text-block']}>
        //             <p className={authStyles['title']}>Введите код</p>

        //             <p className={authStyles['description']}>
        //                 SMS-код был отправлен на номер телефона +7 (921)
        //                 450-20-25
        //             </p>
        //         </div>

        //         <Image
        //             src='/images/phone-code-icon.svg'
        //             width={60}
        //             height={60}
        //             alt=''
        //             priority
        //         />
        //     </div>

        //     <CodeInput ariaLabel='Введите код из SMS' inputQuantity={4} />

        //     <AccessButton
        //         title='Запросить код — через {SECONDS} сек.'
        //         ariaLabel='Запросить код — через {SECONDS} сек.'
        //         className={authStyles['access-button']}
        //     />
        // </form>

        <UserForm
            submitAction={handleSubmit(submit)}
            title='Введите код'
            description='SMS-код был отправлен на номер телефона +7 (921) 450-20-25'
            image='/images/phone-code-icon.svg'
            buttonTitle='Запросить код — через {SECONDS} сек.'
            buttonAriaLabel='Запросить код — через {SECONDS} сек.'
        >
            <Controller
                name='phoneCode'
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                    <CodeInput
                        ariaLabel='Введите код из SMS'
                        inputQuantity={4}
                    />
                )}
            />
        </UserForm>
    );
}
