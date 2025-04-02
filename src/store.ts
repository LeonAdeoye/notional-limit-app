import { configureStore } from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import orderNotionalReducer from './orderNotionalSlice';

const logger = createLogger();

const store = configureStore({
    reducer: {
        orderNotional: orderNotionalReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export default store;
