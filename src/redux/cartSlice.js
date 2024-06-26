import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await fetch('http://localhost:8080/musics');
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  const data = await response.json();
  return data;
});

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
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
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload);
      cartItem.amount += 1;
      state.totalAmount += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(item => item.id === action.payload);
      if (cartItem.amount > 1) {
        cartItem.amount -= 1;
        state.totalAmount -= 1;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        alert("잘못된 접근입니다.");
      });
  }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
