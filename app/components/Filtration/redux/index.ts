import { configureStore } from '@reduxjs/toolkit';
import filtrationReducer from './filtrationSlice';

export const filtrationStore = configureStore({
    reducer: {
        filtration: filtrationReducer,
    },
});

export type RootState = ReturnType<typeof filtrationStore.getState>;
export type AppDispatch = typeof filtrationStore.dispatch;
