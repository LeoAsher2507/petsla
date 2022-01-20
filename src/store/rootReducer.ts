import { combineReducers } from 'redux';
import { themeReducer } from 'src/theme/ThemeSlice';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from 'src/features/auth/services/authSlice';

const reducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof reducer>;
