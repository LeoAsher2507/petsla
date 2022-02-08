import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authApiMethod } from 'src/api/apiMethods';
import {
  ILoginRequestData,
  ILoginResponseError,
  IRegisterRequestData
} from 'src/types/authTypes';

export const loginMethod = createAsyncThunk(
  'auth/loginMethod',
  async (data: ILoginRequestData, thunkApi) => {
    try {
      const response = await authApiMethod.login(data);
      return response;
    } catch (err) {
      const error = err as AxiosError<ILoginResponseError, ILoginRequestData>;
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const registerMethod = createAsyncThunk(
  'auth/registerMethod',
  async (data: IRegisterRequestData, thunkApi) => {
    try {
      const response = await authApiMethod.register(data);
      return response;
    } catch (err) {
      const error = err as AxiosError<
        ILoginResponseError,
        IRegisterRequestData
      >;
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
