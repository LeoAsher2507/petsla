import { createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { loginMethod } from 'src/services/auth/authAction';
import {
  ILoginRequestData,
  ILoginResponseData,
  ILoginResponseError,
} from 'src/types/authTypes';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'src/utils/localStorage';

interface IInitialState {
  token: string;
}

const initialState: IInitialState = {
  token: getLocalStorage('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutMethod: (state) => {
      state.token = '';
      removeLocalStorage('token');
      toast.success('Logout successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginMethod.fulfilled, (state, action) => {
        const payload = action.payload as AxiosResponse<
          ILoginResponseData,
          ILoginRequestData
        >;
        state.token = payload.data.token;
        setLocalStorage('token', state.token);
        toast.success('Login successfully!');
      })
      .addCase(loginMethod.rejected, (state, action) => {
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
