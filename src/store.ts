import { configureStore } from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';

const logger = createLogger();

const store = configureStore({
    reducer: {
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});

export default store;
