import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { collection, getDocs } from "firebase/firestore";

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
};

export const getInitialOrders = createAsyncThunk(
  "orders/getOrders",
  async (arg, thunkApi) => {
    try {
      const orders = [];
      const querySnapshot = await getDocs(collection(db, "orders"));
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
        state.orders = [...action.payload];
      })
      .addCase(getInitialOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const ordersReducer = ordersSlice.reducer;
export const ordersSelector = (state) => ({
  loading: state.ordersReducer.oading,
  error: state.ordersReducer.error,
  orders: state.ordersReducer.orders,
});
