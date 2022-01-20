import { createSlice } from '@reduxjs/toolkit';
import { loginMethod } from 'src/services/auth/authAction';

interface IInitialState {
  token: string;
}

const initialState: IInitialState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginMethod.fulfilled, (state, action) => {
      // state.token = action.payload.token;
    });
  },
});

export const authReducer = authSlice.reducer;
