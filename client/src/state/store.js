import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { userReducer } from './user';
import { loadingReducer } from './loading';

const reducer = {
  user: userReducer,
  loading: loadingReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
