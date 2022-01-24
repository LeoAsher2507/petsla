import { AxiosError } from 'axios';
import { productApiMethod } from 'src/api/apiMethods/';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginResponseError } from 'src/types/authTypes';

export const getAllProductMethod = createAsyncThunk(
  'product/getAllProductMethod',
  async (_, thunkApi) => {
    try {
      const response = await productApiMethod.getAll();
      return response;
    } catch (err) {
      const error = err as AxiosError<ILoginResponseError>;
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getOneProductMethod = createAsyncThunk(
  'product/getOneProductMethod',
  async (id: string, thunkApi) => {
    try {
      const response = await productApiMethod.getOne(id);
      return response;
    } catch (err) {
      const error = err as AxiosError<ILoginResponseError>;
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
