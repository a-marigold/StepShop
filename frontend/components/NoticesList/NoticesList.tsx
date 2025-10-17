'use client';

import { memo } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import Notice from '@/UI/Notice';

import listStyles from './NoticesList.module.scss';

const MemoizedNotice = memo(Notice);

export default function NoticesList() {
    const noticesList = useSelector(
        (state: RootState) => state.notices.noticesList
    );

    return (
        <div className={listStyles['notices-list']}>
            {noticesList.map((notice) => (
                <MemoizedNotice
                    key={notice.id}
                    id={notice.id}
                    title={notice.title}
                    message={notice.message}
                    existenceTime={notice.existenceTime}
                    deleteNotice={notice.deleteNotice}
                />
            ))}
        </div>
    );
}
