import { createSlice } from '@reduxjs/toolkit';

interface IUserSliceState {}

const initialState: IUserSliceState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
