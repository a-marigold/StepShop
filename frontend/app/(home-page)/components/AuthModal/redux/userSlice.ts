import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserType } from '@shared/types/UserTypes';

interface UserSliceState {
    user: Omit<UserType, 'password'>;
}

const initialState: UserSliceState = {
    user: {
        email: '',

        userName: '',
    },
};

type setUserType = PayloadAction<
    | Pick<UserSliceState['user'], 'email'>
    | Pick<UserSliceState['user'], 'userName'>
>;
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action: setUserType) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
