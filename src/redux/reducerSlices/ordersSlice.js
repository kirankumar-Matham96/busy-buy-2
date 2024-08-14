import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {
    initialLoad: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;
export const ordersSelector = (state) => state.ordersReducer.orders;
