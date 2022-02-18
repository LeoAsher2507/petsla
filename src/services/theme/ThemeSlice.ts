import { createSlice } from '@reduxjs/toolkit';

export interface IStyle {
  backgroundColor: string;
  backgroundColor1: string;
  color: string;
  colorBlur: string;
  boxShadowColor: string;
  boxShadowColor1: string;
  borderColor: string;
  primaryColor: string;
}

export interface ITheme {
  isLightTheme: boolean;
  style: IStyle;
}

const _theme = {
  lightTheme: {
    backgroundColor: '#fff',
    backgroundColor1: '#F6F9FC',
    color: 'black',
    colorBlur: '#444',
    boxShadowColor: 'rgba(0, 0, 0, 0.1)',
    boxShadowColor1: 'rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    primaryColor: 'rgb(230, 150, 70)',
  },
  darkTheme: {
    backgroundColor: '#252525',
    backgroundColor1: '#202020',
    color: '#eee',
    colorBlur: '#bbb',
    boxShadowColor: 'rgba(0, 0, 0, 0.3)',
    boxShadowColor1: 'rgba(0, 0, 0, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    primaryColor: 'rgb(230, 150, 70)',
  },
};

const initialState: ITheme = {
  isLightTheme: true,
  style: _theme.lightTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isLightTheme = !state.isLightTheme;
      state.style = state.isLightTheme ? _theme.lightTheme : _theme.darkTheme;
    },
  },
  extraReducers: {},
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
