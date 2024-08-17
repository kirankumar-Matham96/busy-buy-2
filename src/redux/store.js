import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducerSlices/authSlice";
import { itemReducer } from "./reducerSlices/itemsSlice";
import { cartReducer } from "./reducerSlices/cartSlice";
import { ordersReducer } from "./reducerSlices/ordersSlice";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

/**
 * Configures and creates the Redux store for the application.
 * The store combines multiple reducers into a single state object and sets up the state management for the app.
 *
 * The store includes the following reducers:
 * - `authReducer`: Manages authentication-related state.
 * - `itemReducer`: Manages items-related state, including filtering and search functionalities.
 * - `cartReducer`: Manages the state of the shopping cart, including items, total price, and loading/error states.
 * - `ordersReducer`: Manages the state of orders, including fetching and adding orders.
 *
 * The middleware includes logger function that logs message to console at every action.
 *
 * @type {store}
 */
export const store = configureStore({
  reducer: {
    authReducer,
    itemReducer,
    cartReducer,
    ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
