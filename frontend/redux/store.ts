import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

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

import filtrationReducer from '@/app/(home-page)/components/Filtration/redux';
import cartReducer from './CartSlice';
import noticesReducer from './NoticeSlice';
import userReducer from '@/app/(home-page)/components/AuthModal/redux';

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
        notices: noticesReducer,
        user: userReducer,
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
// export const dispatch = useDispatch<AppDispatch>();
