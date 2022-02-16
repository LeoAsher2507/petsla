import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authApiMethod } from 'src/api/apiMethods';
import {
  setCurrentCustomerInfo,
  setCurrentUser,
} from 'src/services/user/userSlice';
import {
  ILoginRequestData,
  ILoginResponseError,
  IOrderInfo,
  IRegisterRequestData,
  IUser,
} from 'src/types/authTypes';

export const loginMethod = createAsyncThunk(
  'auth/loginMethod',
  async (data: ILoginRequestData, thunkApi) => {
    try {
      const response = await authApiMethod.login(data);
      const currentOrderInfo: IOrderInfo = {
        id: response.data.id,
        name: response.data.name,
        address: '',
        phoneNumber: '',
      };
      const currentUser: IUser = {
        id: response.data.id,
        name: response.data.name,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        username: response.data.username,
        isAdmin: response.data.isAdmin,
        email: response.data.email,
      };
      thunkApi.dispatch(setCurrentCustomerInfo(currentOrderInfo));
      thunkApi.dispatch(setCurrentUser(currentUser));

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
