import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authSelector } from "./authSlice";

export const getInitialCartItems = createAsyncThunk(
  "cart/getInitialCart",
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

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

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      // fetch cartItems from db
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnapshot = await getDoc(docRef);

      const cartList = cartSnapshot.exists()
        ? [...cartSnapshot.data().cartItems]
        : [];

      // check if item exists
      const isItemExists = cartList.some((cartItem) => cartItem.id === item.id);

      if (isItemExists) {
        // if exists, increment quantity
        cartList.map((cartItem) => {
          if (cartItem.id === item.id) {
            cartItem.quantity++;
          }
          return cartItem;
        });
      } else {
        // if not, add item to cart along with quantity:1
        cartList.push({ ...item, quantity: 1 });
      }

      // push the new cart data to db
      await setDoc(docRef, { cartItems: cartList });
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = { cart: [], loading: false, error: null };

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    initialLoad: (state, action) => {
      state.cart = [...action.payload];
    },
    // add: (state, action) => {
    //   const existingItem = state.cart.find(
    //     (item) => action.payload.id === item.id
    //   );
    //   if (existingItem) {
    //     existingItem.quantity++;
    //   } else {
    //     state.cart.push({ ...action.payload, quantity: 1 });
    //   }
    // },
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
