import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from 'src/services/auth/authSlice';
import { productReducer } from 'src/services/product/productSlice';
import { themeReducer } from 'src/services/theme/ThemeSlice';

const reducer = combineReducers({
  themeState: themeReducer,
  authState: authReducer,
  productState: productReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
