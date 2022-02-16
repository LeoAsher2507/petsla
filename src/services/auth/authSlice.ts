import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { loginMethod } from 'src/services/auth/authAction';
import {
  ILoginRequestData,
  ILoginResponseData,
  ILoginResponseError,
} from 'src/types/authTypes';
import { ERequestStatus } from 'src/types/commonType';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'src/utils/localStorage';

interface IInitialState {
  token: string;
  requestStatus: ERequestStatus;
}

const initialState: IInitialState = {
  token: getLocalStorage('token'),
  requestStatus: ERequestStatus.FULFILLED,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutMethod: (state) => {
      state.token = '';
      removeLocalStorage('token');
      removeLocalStorage('currentOrderInfo');
      toast.success(t('message.success.logout'));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginMethod.pending, (state, action) => {
        state.requestStatus = ERequestStatus.PENDING;
      })

      .addCase(loginMethod.fulfilled, (state, action) => {
        state.requestStatus = ERequestStatus.FULFILLED;
        const payload = action.payload as AxiosResponse<
          ILoginResponseData,
          ILoginRequestData
        >;
        state.token = payload.data.token;
        setLocalStorage('token', state.token);
        toast.success(t('message.success.login'));
      })
      .addCase(loginMethod.rejected, (state, action) => {
        state.requestStatus = ERequestStatus.REJECTED;
        const payload = action.payload as AxiosResponse<
          ILoginResponseError,
          ILoginRequestData
        >;
        toast.error(payload.data.detail);
      });
  },
});

export const authReducer = authSlice.reducer;

export const { logoutMethod } = authSlice.actions;
