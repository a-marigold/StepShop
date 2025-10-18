'use client';

import { memo, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '@/redux/store';

import { deleteNoticeById } from '@/utils/noticeGlobalState';

import Notice from '@/UI/Notice';

import listStyles from './NoticesList.module.scss';

const MemoizedNotice = memo(Notice);

export default function NoticesList() {
    const noticesList = useSelector(
        (state: RootState) => state.notices.noticesList
    );

    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteNotice = useCallback((id: string) => {
        deleteNoticeById(id, dispatch);
    }, []);

    return (
        <div className={listStyles['notices-list']} id='notices-list'>
            {noticesList.map((notice) => (
                <MemoizedNotice
                    key={notice.id}
                    title={notice.title}
                    message={notice.message}
                    type={notice.type}
                    existenceTime={notice.existenceTime}
                    deleteNotice={() => handleDeleteNotice(notice.id)}
                    portalRootId='notices-list'
                />
            ))}
        </div>
    );
}
