import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducerSlices/authSlice";
import { itemReducer } from "./reducerSlices/itemsSlice";
import { cartReducer } from "./reducerSlices/cartSlice";
import { ordersReducer } from "./reducerSlices/ordersSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    itemReducer,
    cartReducer,
    ordersReducer,
  },
});
