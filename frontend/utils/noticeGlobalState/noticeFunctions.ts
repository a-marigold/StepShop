import type { AppDispatch } from '@/redux/store';

import { addNotice, deleteNotice } from '@/redux/NoticeSlice';

import type { NoticeType } from '@/types/NoticeType';

export function addPositiveNotice(
    title: NoticeType['title'],
    message: NoticeType['message'],
    existenceTime: NoticeType['existenceTime'] = 10,
    dispatch: AppDispatch
) {
    dispatch(
        addNotice({
            id: crypto.randomUUID(),
            title: title,
            message: message,
            type: 'success',
            existenceTime: existenceTime,
        })
    );
}

export function addErrorNotice(
    title: NoticeType['title'],
    message: NoticeType['message'],
    existenceTime: NoticeType['existenceTime'] = 10,
    dispatch: AppDispatch
) {
    dispatch(
        addNotice({
            id: crypto.randomUUID(),
            title: title,
            message: message,
            type: 'error',
            existenceTime: existenceTime,
        })
    );
}

export function deleteNoticeById(id: NoticeType['id'], dispatch: AppDispatch) {
    dispatch(deleteNotice(id));
}
