import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { cart: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    initialLoad: (state, action) => {
      state.cart = [...action.payload];
    },
    add: (state, action) => {
      const existingItem = state.cart.find(
        (item) => action.payload.id === item.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    remove: (state, action) => {
      state.cart = state.cart.filter((item) => {
        if (item.id !== action.payload) {
          return item;
        }
      });
    },
    increase: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
    },
    decrease: (state, action) => {
      state.cart = state.cart
        .map((item) => {
          if (item.id === action.payload) {
            item.quantity--;
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { initialLoad, add, remove, increase, decrease } =
  cartSlice.actions;
export const cartSelector = (state) => state.cartReducer.cart;
