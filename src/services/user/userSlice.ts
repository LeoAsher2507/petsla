import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  addOrderMethod,
  getUserInfoMethod,
} from 'src/services/user/userAction';
import { IOrderInfo, IUser } from 'src/types/authTypes';
import { ERequestStatus } from 'src/types/commonType';
import { IRequestedOrder } from 'src/types/productTypes';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'src/utils/localStorage';

interface IUserSliceState {
  currentOrderInfo: IOrderInfo | null;
  currentUser: IUser | null;
  orders: IRequestedOrder[];
  requestStatus: ERequestStatus;
}

const initialState: IUserSliceState = {
  currentOrderInfo: getLocalStorage('currentOrderInfo'),
  orders: [],
  currentUser: getLocalStorage('currentUser'),
  requestStatus: ERequestStatus.FULFILLED,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentCustomerInfo: (
      state,
      action: PayloadAction<IOrderInfo | null>
    ) => {
      state.currentOrderInfo = action.payload;
      action.payload === null
        ? removeLocalStorage('currentOrderInfo')
        : setLocalStorage('currentOrderInfo', action.payload);
    },

    setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
      state.currentUser = action.payload;
      action.payload === null
        ? removeLocalStorage('currentUser')
        : setLocalStorage('currentUser', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderMethod.fulfilled, (state, action) => {})
      .addCase(getUserInfoMethod.pending, (state) => {
        state.requestStatus = ERequestStatus.PENDING;
      })
      .addCase(getUserInfoMethod.fulfilled, (state, action) => {
        state.currentUser = {
          id: action.payload.id,
          firstName: action.payload.first_name,
          lastName: action.payload.last_name,
          isAdmin: action.payload.isAdmin,
          email: action.payload.email,
          name: action.payload.name,
          username: action.payload.username,
        };
        setLocalStorage('currentUser', action.payload);
        state.requestStatus = ERequestStatus.FULFILLED;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { setCurrentCustomerInfo, setCurrentUser } = userSlice.actions;
