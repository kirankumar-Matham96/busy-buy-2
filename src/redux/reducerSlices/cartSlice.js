import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { collection, getDocs } from "firebase/firestore";

export const getInitialCartItems = createAsyncThunk(
  "cart/getInitialCart",
  async (arg, thunkApi) => {
    try {
      const cartItems = [];
      const querySnapshot = await getDocs(collection(db, "cart"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        cartItems.push({ id: doc.id, ...doc.data() });
      });

      thunkApi.dispatch(cartItems);
    } catch (error) {
      console.log(error);
    }
  }
);

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
