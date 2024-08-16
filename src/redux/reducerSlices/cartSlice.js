import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { authSelector } from "./authSlice";

export const getInitialCartItems = createAsyncThunk(
  "cart/getInitialCart",
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);
    try {
      const querySnapshot = await getDoc(doc(db, "cart", currentUser.email));
      if (querySnapshot.exists()) {
        const cartItems = { id: querySnapshot.id, ...querySnapshot.data() };
        return cartItems.cartItems;
      }
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const addToCart = createAsyncThunk("cart/add", (arg, thunkApi) => {
//   try {
//     setDoc()
//   } catch (error) {
//     console.log(error);
//   }
// });

const INITIAL_STATE = { cart: [], loading: false, error: null };

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
  extraReducers: (builder) =>
    builder
      .addCase(getInitialCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [...action.payload];
      })
      .addCase(getInitialCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const cartReducer = cartSlice.reducer;
export const { initialLoad, add, remove, increase, decrease } =
  cartSlice.actions;
export const cartSelector = (state) => state.cartReducer.cart;
