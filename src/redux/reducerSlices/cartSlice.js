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
    const { cart } = cartSelector(state);

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

      return [...cart, item];
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems = (cartSnap.exists() && cartSnap.data().cartItems) || [];

      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== id
      );

      if (updatedCartItems.length === cartItems.length) {
        return thunkApi.rejectWithValue("Item not found");
      }

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const reduceQuantity = createAsyncThunk(
  "cart/reduceQuantity",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems =
        (cartSnap.exists() && [...cartSnap.data().cartItems]) || [];

      const updatedCartItems = cartItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);

    if (!currentUser || !currentUser.email) {
      return thunkApi.rejectWithValue("Please Login!");
    }

    try {
      const docRef = doc(db, "cart", currentUser.email);
      const cartSnap = await getDoc(docRef);
      const cartItems = (cartSnap.exists() && cartSnap.data().cartItems) || [];

      const updatedCartItems = cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // Update the state with the new cart items
      await setDoc(docRef, { cartItems: updatedCartItems });

      // Return updated cart items to update the store
      return updatedCartItems;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = { cart: [], loading: false, error: null, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getInitialCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || [];
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(getInitialCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(increaseQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(reduceQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduceQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      })
      .addCase(reduceQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const cartReducer = cartSlice.reducer;
export const { initialLoad, add, remove, increase, decrease } =
  cartSlice.actions;
export const cartSelector = (state) => ({
  cart: state.cartReducer.cart,
  totalPrice: state.cartReducer.totalPrice,
  loading: state.cartReducer.loading,
  error: state.cartReducer.error,
});
