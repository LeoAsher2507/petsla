import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApiMethod } from 'src/features/auth/api';
import {
  ILoginRequestData,
  IRegisterRequestData,
} from 'src/shared/types/userType';

export const loginMethod = createAsyncThunk(
  'auth/loginMethod',
  async (data: ILoginRequestData) => {
    try {
      const response = await authApiMethod.login(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const registerMethod = createAsyncThunk(
  'auth/registerMethod',
  async (data: IRegisterRequestData) => {
    try {
      const response = await authApiMethod.register(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
