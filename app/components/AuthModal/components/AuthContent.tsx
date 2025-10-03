import type { ReactNode } from 'react';

import AccessButton from '@/UI/AccessButton';

import authStyles from '../AuthModal.module.scss';

interface AuthContentProps {
    title: string;

    description: string;

    image: string;

    buttonTitle: string;

    children?: ReactNode;
}
export default function AuthContent({
    title,
    description,
    image,
    buttonTitle,
    children,
}: AuthContentProps) {
    return (
        <>
            <div className={authStyles['content-block']}>
                <div className={authStyles['text-block']}>
                    <p className={authStyles['title']}>{title}</p>

                    <p className={authStyles['description']}>{description}</p>
                </div>

                <img src={image} width={60} height={60} alt='' />
            </div>

            {children}

            <AccessButton title={buttonTitle} ariaLabel={buttonTitle} />
        </>
    );
}
