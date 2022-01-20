import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApiMethod } from 'src/api/apiMethods';

import { ILoginRequestData, IRegisterRequestData } from 'src/types/userType';

export const loginMethod = createAsyncThunk(
  'auth/loginMethod',
  async (data: ILoginRequestData) => {
    try {
      const response = await authApiMethod.login(data);
      console.log('res', response);
      return response;
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
      return response;
    } catch (error) {
      return error;
    }
  }
);
