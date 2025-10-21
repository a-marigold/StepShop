'use client';

import type { ReactNode } from 'react';

import Image from 'next/image';

import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

interface UserFormProps {
    title: string;
    description: string;
    image?: string;

    buttonTitle: string;
    buttonAriaLabel: string;

    submitAction: (...args: any) => void;

    children: ReactNode;
}

export default function UserForm({
    title,
    description,
    image,

    buttonTitle,
    buttonAriaLabel,

    submitAction,

    children,
}: UserFormProps) {
    return (
        <form onSubmit={submitAction} className={authStyles['user-form']}>
            <div className={authStyles['content-block']}>
                <div className={authStyles['text-block']}>
                    <p className={authStyles['title']}>{title}</p>

                    <p className={authStyles['description']}>{description}</p>
                </div>

                {image && (
                    <Image src={image} width={60} height={60} alt='' priority />
                )}
            </div>

            {children}

            <AccessButton
                title={buttonTitle}
                ariaLabel={buttonAriaLabel}
                buttonType='submit'
                className={authStyles['access-button']}
            />
        </form>
    );
}
