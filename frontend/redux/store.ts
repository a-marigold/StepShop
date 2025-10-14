import { configureStore } from '@reduxjs/toolkit';

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PERSIST,
    PAUSE,
    PURGE,
    REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import filtrationReducer from '@/app/(public-pages)/components/Filtration/redux';
import cartReducer from './CartSlice';

const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['cartProducts', 'totalAmount'],
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
    reducer: {
        filtration: filtrationReducer,
        cart: persistedCartReducer,
    },

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,

                    REGISTER,
                    PAUSE,
                    REHYDRATE,
                    PERSIST,
                    PURGE,
                ],
            },
        });
    },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
