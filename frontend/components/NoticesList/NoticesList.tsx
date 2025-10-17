'use client';

import { memo, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';

import { deleteNotice } from '@/redux/NoticeSlice';

import Notice from '@/UI/Notice';

import listStyles from './NoticesList.module.scss';

const MemoizedNotice = memo(Notice);

export default function NoticesList() {
    const noticesList = useSelector(
        (state: RootState) => state.notices.noticesList
    );

    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteNotice = useCallback((id: string) => {
        dispatch(deleteNotice(id));
    }, []);

    return (
        <div className={listStyles['notices-list']}>
            {noticesList.map((notice) => (
                <MemoizedNotice
                    key={notice.id}
                    title={notice.title}
                    message={notice.message}
                    existenceTime={notice.existenceTime}
                    deleteNotice={() => handleDeleteNotice(notice.id)}
                />
            ))}
        </div>
    );
}
