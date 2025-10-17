'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import noticeStyles from './Notice.module.scss';

interface NoticeProps {
    title: string;
    message?: string;

    existenceTime: number;
}

export default function Notice({ title, message, existenceTime }: NoticeProps) {
    const [showMessage, setShowMessage] = useState(false);

    return createPortal(
        <div className={noticeStyles['notice']}>
            <div className={noticeStyles['title-block']}>
                <div className={noticeStyles['title-group']}>
                    <svg
                        height='21'
                        viewBox='0 0 256 256'
                        color='var(--positive-notice-color)'
                    >
                        <use href='#check-mark-icon' />
                    </svg>

                    <p className={noticeStyles['title']}>{title}</p>
                </div>

                <div className={noticeStyles['buttons-group']}>
                    <button onClick={() => setShowMessage((prev) => !prev)}>
                        <svg
                            width={21}
                            height={21}
                            color='var(--secondary-font-color)'
                            className={clsx(
                                noticeStyles['accordion-icon'],
                                showMessage &&
                                    noticeStyles['accordion-icon-active']
                            )}
                        >
                            <use href='#accordion-arrow-icon' />
                        </svg>
                    </button>

                    <button>
                        <svg
                            width={12}
                            height={12}
                            color='var(--secondary-font-color)'
                        >
                            <use href='#small-cross-icon' />
                        </svg>
                    </button>
                </div>
            </div>

            {message && showMessage && (
                <div className={noticeStyles['message-block']}>
                    <p className={noticeStyles['message']}>{message}</p>

                    <button className={noticeStyles['accept-button']}>
                        Принять
                    </button>
                </div>
            )}

            <div className={noticeStyles['time-line']} />
        </div>,
        document.body
    );
}
