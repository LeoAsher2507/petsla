import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllProductMethod,
  getOneProductMethod,
} from 'src/services/product/productAction';
import { IProduct } from './../../types/productTypes';

interface IInitialState {
  productList: IProduct[];
  currentProduct: IProduct;
}

const initialState: IInitialState = {
  productList: [],
  currentProduct: {
    id: 0,
    category: 0,
    created_date: '',
    description: '',
    images: '',
    modified_date: '',
    price: 0,
    product_name: '',
    stock: 0,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductMethod.fulfilled, (state, action) => {
        state.productList = action.payload.data;
      })

      .addCase(getOneProductMethod.fulfilled, (state, action) => {
        state.currentProduct = action.payload.data;
      })

      .addCase(getOneProductMethod.rejected, (state, action) => {
        toast.error('Get product fail!');
      });
  },
});

export const productReducer = productSlice.reducer;
