import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalPrice = 0;
    },
    removeItem: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      state.totalAmount -= item.amount;
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      console.log("remove");
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload);
      cartItem.amount += 1;
      state.totalAmount += 1;
      console.log("increase");
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload);
      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
        state.totalAmount -= 1;
        console.log("decrese");
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        state.totalAmount -= 1;
      }
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;
      state.cartItems.forEach(item => {
        totalAmount += item.amount;
        totalPrice += item.amount * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalPrice = totalPrice;
    }
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
