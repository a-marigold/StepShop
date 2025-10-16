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

                <div className={noticeStyles['buttons-group']}></div>
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
