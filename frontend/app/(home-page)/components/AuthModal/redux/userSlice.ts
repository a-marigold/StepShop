// TODO (5): Add authStep state here

import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type { UserType } from '@shared/types/UserTypes';

interface UserSliceState {
    user: Omit<UserType, 'password'>;
    authStep: number;
    codeTime: number;
}

const initialState: UserSliceState = {
    user: {
        email: '',

        userName: '',
    },
    authStep: 1,
    codeTime: 32,
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
        increaseAuthStep: (state) => {
            state.authStep = state.authStep + 1;
        },
        resetCodeTime: (state) => {
            state.codeTime = 32;
        },
        decreaseCodeTime: (state) => {
            if (state.codeTime > 0) {
                state.codeTime = state.codeTime - 1;
            }
        },
    },
});

export const { setUser, increaseAuthStep, decreaseCodeTime, resetCodeTime } =
    userSlice.actions;
export default userSlice.reducer;
