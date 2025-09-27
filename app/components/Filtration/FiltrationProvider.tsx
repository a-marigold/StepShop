'use client';

import { Provider } from 'react-redux';
import { filtrationStore } from './redux';

import Filtration from './Filtration';

export default function FiltrationProvider() {
    return (
        <Provider store={filtrationStore}>
            <Filtration />
        </Provider>
    );
}
