import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authReducer } from 'src/services/auth/authSlice';
import { modalReducer } from 'src/services/modal/modalSlice';
import { productReducer } from 'src/services/product/productSlice';
import { themeReducer } from 'src/services/theme/ThemeSlice';
import { userReducer } from 'src/services/user/userSlice';
import { ERequestStatus } from 'src/types/commonType';

const reducer = combineReducers({
  themeState: themeReducer,
  authState: authReducer,
  productState: productReducer,
  modalState: modalReducer,
  userState: userReducer,
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
export const requestStatusSelector = (state: RootState) => {
  const listStatus: ERequestStatus[] = [
    state.authState.requestStatus,
    state.productState.requestStatus,
  ];

  const status: ERequestStatus = listStatus.some(
    (_status: ERequestStatus) => _status === ERequestStatus.PENDING
  )
    ? ERequestStatus.PENDING
    : listStatus.some(
        (_status: ERequestStatus) => _status === ERequestStatus.REJECTED
      )
    ? ERequestStatus.REJECTED
    : ERequestStatus.FULFILLED;

  return status;
};
