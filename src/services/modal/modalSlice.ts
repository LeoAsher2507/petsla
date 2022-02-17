import { createSlice } from '@reduxjs/toolkit';

interface IModalSliceState {
  loginModalIsOpen: boolean;
  registerModalIsOpen: boolean;
  checkoutModalIsOpen: boolean;
}

const initialState: IModalSliceState = {
  loginModalIsOpen: false,
  registerModalIsOpen: false,
  checkoutModalIsOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // openLoginModal: (state) => {
    //   state.loginModalIsOpen = true;
    // },

    // closeLoginModal: (state) => {
    //   state.loginModalIsOpen = false;
    // },

    // openRegisterModal: (state) => {
    //   state.registerModalIsOpen = true;
    // },

    // closeRegisterModal: (state) => {
    //   state.registerModalIsOpen = false;
    // },

    setLoginModalIsOpen: (state, action) => {
      state.loginModalIsOpen = action.payload;
    },

    setRegisterModalIsOpen: (state, action) => {
      state.registerModalIsOpen = action.payload;
    },

    setCheckoutModalIsOpen: (state, action) => {
      state.checkoutModalIsOpen = action.payload;
    },
  },
});

export const modalReducer = modalSlice.reducer;

export const {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
  setCheckoutModalIsOpen,
} = modalSlice.actions;
