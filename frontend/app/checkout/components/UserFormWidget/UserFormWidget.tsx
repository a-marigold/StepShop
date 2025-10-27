'use client';

// import { useSelector } from 'react-redux';
// import type { RootState } from '@/redux/store';

import CheckoutWidget from '@/UI/CheckoutWidget';
import PrimaryInput from '@/UI/PrimaryInput';

import formStyles from './UserFormWidget.module.scss';

const userInputs = [
    {
        title: 'Имя',
        errorLabelTitle: 'Введите ваше имя',
        htmlId: 'name-input',
        inputType: 'text',
    },
    {
        title: 'Фамилия',
        errorLabelTitle: 'Введите вашу фамилию',
        htmlId: 'surname-input',
        inputType: 'text',
    },

    {
        title: 'E-Mail',
        errorLabelTitle: 'Введите ваш E-Mail',
        htmlId: 'e-mail-input',
        inputType: 'email',
    },
    {
        title: 'Телефон',
        errorLabelTitle: 'Введите ваш номер телефона',
        htmlId: 'personal-phone-number-input',
        placeholder: '+X XXX XXX XX-XX',
        inputType: 'text',
    },
];

export default function UserFormWidget() {
    return (
        <CheckoutWidget title='2. Персональная информация'>
            <div className={formStyles['user-form']}>
                {userInputs.map((userInput) => (
                    <PrimaryInput
                        key={userInput.title}
                        title={userInput.title}
                        htmlId={userInput.htmlId}
                        errorLabelTitle={userInput.errorLabelTitle}
                        isValid={true}
                        placeholder={userInput.placeholder}
                        className={formStyles['user-input']}
                    />
                ))}
            </div>
        </CheckoutWidget>
    );
}
