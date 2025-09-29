import { configureStore } from '@reduxjs/toolkit';
import filtrationReducer from '../app/components/Filtration/redux';

export const store = configureStore({
    reducer: {
        filtration: filtrationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
