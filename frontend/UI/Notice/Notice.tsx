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
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            version='1.1'
                            id='Capa_1'
                            x='0px'
                            y='0px'
                            width='16px'
                            height='12px'
                            viewBox='0 0 960 560'
                            enableBackground='new 0 0 960 560'
                            xmlSpace='preserve'
                        >
                            <g id='Rounded_Rectangle_33_copy_4_1_'>
                                <path d='M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937   c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z' />
                            </g>
                        </svg>
                    </button>
                    <button></button>
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
