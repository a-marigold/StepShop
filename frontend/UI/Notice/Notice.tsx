'use client';

import { createPortal } from 'react-dom';

import noticeStyles from './Notice.module.scss';

interface NoticeProps {
    title: string;
    message?: string;

    existenceTime: number;
}

export default function Notice({ title, message, existenceTime }: NoticeProps) {
    return createPortal(
        <div className={noticeStyles['notice']}>
            <div className={noticeStyles['title-block']}>
                <div className={noticeStyles['title-group']}>
                    {/* _ICON_ */}

                    <p className={noticeStyles['title']}>{title}</p>
                </div>

                <div className={noticeStyles['buttons-group']}>
                    <button>
                        <svg
                            width={21}
                            height={21}
                            color='var(--secondary-font-color)'
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

            {message && (
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
