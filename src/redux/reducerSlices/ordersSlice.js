import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { authSelector } from "./authSlice";

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
};

export const getInitialOrders = createAsyncThunk(
  "orders/getOrders",
  async (arg, thunkApi) => {
    const state = thunkApi.getState();
    const { currentUser } = authSelector(state);
    try {
      const orders = [];
      // const querySnapshot = await getDocs(collection(db, "orders"));
      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      console.log(error);
      thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (newOrder, thunkApi) => {
    console.log("In Order thunk");

    try {
      const docRef = collection(db, "orders");
      await addDoc(docRef, newOrder);
      console.log("Order added");
      await thunkApi.dispatch(getInitialOrders()).unwrap();
      console.log("Orders updated");
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getInitialOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInitialOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload && [...action.payload];
      })
      .addCase(getInitialOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const ordersReducer = ordersSlice.reducer;
export const ordersSelector = (state) => ({
  loading: state.ordersReducer.loading,
  error: state.ordersReducer.error,
  orders: state.ordersReducer.orders,
});
