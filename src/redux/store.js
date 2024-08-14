import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./reducerSlices/itemsSlice";
import { cartReducer } from "./reducerSlices/cartSlice";
import { ordersReducer } from "./reducerSlices/ordersSlice";

export const store = configureStore({
  reducer: {
    itemReducer,
    cartReducer,
    ordersReducer,
  },
});
