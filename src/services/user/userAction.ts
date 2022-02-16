import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApiMethod } from 'src/api/apiMethods';
import { IRequestedOrder } from 'src/types/productTypes';

export const getUserInfoMethod = createAsyncThunk(
  'user/getUserInfoMethod',
  async (_, thunkApi) => {
    try {
      const response = await userApiMethod.getUserInfo();
      console.log('get profile', response);
      return response.data;
    } catch (error) {
      console.log('error::', error);
    }
  }
);

export const addOrderMethod = createAsyncThunk(
  'user/addOrderMethod',
  async (order: IRequestedOrder, thunkApi) => {
    try {
      const response = await userApiMethod.addOrder(order);
      console.log('add order', response);
      return response.data;
    } catch (error) {
      console.log('error::', error);
    }
  }
);

export const getAllOrderMethod = createAsyncThunk(
  'user/getAllOrderMethod',
  async (_, thunkApi) => {
    try {
      const response = await userApiMethod.getAllOrder();
      console.log('get all order', response.data);
      return response.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }
);

export const getOneOrderMethod = createAsyncThunk(
  'user/getOneOrderMethod',
  async (id: number, thunkApi) => {
    try {
      const response = await userApiMethod.getOneOrder(id);
      console.log('get 1 order', response.data);
      return response.data;
    } catch (error) {
      console.log('error: ', error);
    }
  }
);
