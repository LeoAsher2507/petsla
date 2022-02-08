import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getAllProductMethod,
  getOneProductMethod,
} from 'src/services/product/productAction';
import { ERequestStatus } from 'src/types/commonType';
import { ICartProduct, IProduct } from 'src/types/productTypes';

interface IInitialState {
  productList: IProduct[];
  currentProduct: IProduct;
  cartList: ICartProduct[];
  totalInCart: ITotalInCart;
  requestStatus: ERequestStatus;
}

interface ITotalInCart {
  quantity: number;
  price: number;
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
  cartList: [],
  totalInCart: {
    quantity: 0,
    price: 0,
  },
  requestStatus: ERequestStatus.FULFILLED,
};

const calculateTotalInCart = (cartList: ICartProduct[]): ITotalInCart => {
  const totalQuantity = cartList.reduce(
    (prevValue, currProduct: ICartProduct) => prevValue + currProduct.quantity,
    0
  );

  const totalPrice = cartList.reduce(
    (prevValue, currProduct: ICartProduct) =>
      prevValue + currProduct.quantity * currProduct.price,
    0
  );

  return {
    quantity: totalQuantity,
    price: totalPrice,
  };
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product: ICartProduct = action.payload;
      if (product.id) {
        const index = state.cartList.findIndex(
          (item: ICartProduct) => item.id === product.id
        );
        index >= 0
          ? (state.cartList[index].quantity += product.quantity)
          : state.cartList.unshift(product);

        state.totalInCart = calculateTotalInCart(state.cartList);
      }
    },

    removeFromCart: (state, action) => {
      const id: number = action.payload;
      if (id) {
        state.cartList = state.cartList.filter((item) => item.id !== id);
        state.totalInCart = calculateTotalInCart(state.cartList);
      }
    },

    handlePlus: (state, action) => {
      const id: number = action.payload;
      if (id) {
        const index = state.cartList.findIndex(
          (item: ICartProduct) => item.id === id
        );

        if (index >= 0) state.cartList[index].quantity += 1;
        state.totalInCart = calculateTotalInCart(state.cartList);
      }
    },

    handleMinus: (state, action) => {
      const id: number = action.payload;
      if (id) {
        const index = state.cartList.findIndex(
          (item: ICartProduct) => item.id === id
        );

        index >= 0 && state.cartList[index].quantity > 1
          ? (state.cartList[index].quantity -= 1)
          : (state.cartList[index].quantity -= 0);

        state.totalInCart = calculateTotalInCart(state.cartList);
      }
    },

    resetCurrentProduct: (state) => {
      state.currentProduct = {
        id: 0,
        category: 0,
        created_date: '',
        description: '',
        images: '',
        modified_date: '',
        price: 0,
        product_name: '',
        stock: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductMethod.pending, (state, action) => {
        state.requestStatus = ERequestStatus.PENDING;
      })

      .addCase(getAllProductMethod.fulfilled, (state, action) => {
        state.productList = action.payload.data;
        state.requestStatus = ERequestStatus.FULFILLED;
      })

      .addCase(getOneProductMethod.pending, (state, action) => {
        state.requestStatus = ERequestStatus.PENDING;
      })

      .addCase(getOneProductMethod.fulfilled, (state, action) => {
        state.currentProduct = action.payload.data;
        state.requestStatus = ERequestStatus.FULFILLED;
      })

      .addCase(getOneProductMethod.rejected, (state, action) => {
        toast.error('Get product fail!');
        state.requestStatus = ERequestStatus.REJECTED;
      });
  },
});

export const productReducer = productSlice.reducer;
export const {
  addToCart,
  handlePlus,
  handleMinus,
  removeFromCart,
  resetCurrentProduct,
} = productSlice.actions;
