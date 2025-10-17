import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { NoticeType } from '@/types/NoticeType';

interface NoticeSliceState {
    noticesList: NoticeType[];
}

const initialState: NoticeSliceState = {
    noticesList: [{ id: 'aa-bb-cc', title: 'abcd', existenceTime: 1000 }],
};

const noticeSlice = createSlice({
    name: 'notices',
    initialState,
    reducers: {
        addNotice: (state, action: PayloadAction<NoticeType>) => {
            state.noticesList.push(action.payload);
        },
        deleteNotice: (
            state,
            action: PayloadAction<Pick<NoticeType, 'id'>['id']>
        ) => {
            state.noticesList = state.noticesList.filter(
                (notice) => notice.id !== action.payload
            );
        },
    },
});

export const { addNotice, deleteNotice } = noticeSlice.actions;
export default noticeSlice.reducer;
