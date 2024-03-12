import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartState: false,
  carts: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    addToCart: (state, action) => {
      const itemIndex = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (itemIndex) {
        itemIndex.quantity += action.payload.quantity;
      } else {
        state.carts.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.price * action.payload.quantity;
    },
    removeToCart: (state, action) => {
      const itemToRemove = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.carts = state.carts.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    addQuantity: (state, action) => {
      const itemIndex = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (itemIndex) {
        itemIndex.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += itemIndex.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (itemIndex) {
        itemIndex.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= itemIndex.price;
      }
    },
    resetCart: (state, action) => {
      state.carts = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  addToCart,
  removeToCart,
  addQuantity,
  decreaseQuantity,
  resetCart,
  reset,
} = cartSlice.actions;

export default cartSlice.reducer;
