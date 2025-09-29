'use client';

import type { ReactNode } from 'react';

import { Provider } from 'react-redux';

// TODO: Add PersistGate with persistor from store

// import { PersistGate } from 'redux-persist/integration/react';

import { store } from './store';

export default function ReduxWrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}> {children}</Provider>;
}
