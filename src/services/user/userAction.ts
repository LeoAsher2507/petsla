import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApiMethod } from 'src/api/apiMethods';
export const getProfileMethod = createAsyncThunk(
  'user/getProfileMethod',
  async (_, thunkApi) => {
    try {
      const response = await userApiMethod.getUserInfo();
      console.log('get profile', response);
    } catch (error) {
      console.log('error::', error);
    }
  }
);
