import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firestore.config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { authSelector } from "./authSlice";

const INITIAL_STATE = {
  orders: [],
  loading: false,
  error: null,
};

/**
 * Thunk action creator for fetching the initial orders from the Firestore database.
 * This action retrieves the list of orders associated with the currently authenticated user.
 *
 * @functiongetInitialOrders
 * @param {undefined} arg - Unused argument, can be used for additional parameters if needed.
 * @param {Object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {Function} thunkApi.getState - Function to access the current Redux state.
 * @param {Function} thunkApi.rejectWithValue - Function to return a rejected promise with an error message.
 * @returns {Promise<Array<Object>>} - A promise that resolves with an array of order objects, each containing an `id` and order data, or rejects with an error message if the fetch fails.
 *
 * @throws {string} - Throws an error message if the fetch operation fails.
 */
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

/**
 * Thunk action creator for adding a new order to the Firestore database.
 * This action creates a new document in the "orders" collection with the provided order data,
 * and then dispatches an action to fetch and update the list of orders.
 *
 * @functionaddOrder
 * @param {Object} newOrder - The order data to be added to the database. Should include details like items, userId, etc.
 * @param {Object} thunkApi - The thunk API object provided by Redux Toolkit.
 * @param {Function} thunkApi.dispatch - Function to dispatch actions to the Redux store.
 * @param {Function} thunkApi.rejectWithValue - Function to return a rejected promise with an error message.
 * @returns {Promise<void>} - A promise that resolves when the new order is added and the orders list is updated, or rejects with an error message if the operation fails.
 *
 * @throws {string} - Throws an error message if the addition of the order or fetching of orders fails.
 */
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

/**
 * Slice for managing order-related state in the Redux store.
 *
 * This slice handles the state of orders, including loading state and errors,
 * and integrates with asynchronous thunks to manage order-related actions.
 *
 * @constantordersSlice
 * @type {Object}
 * @property {Function} reducer - The reducer function generated by `createSlice` for handling actions.
 * @property {Object} actions - The actions generated by `createSlice`, though none are defined here.
 *
 * @property {Object} initialState - The initial state of the orders slice.
 * @property {boolean} initialState.loading - A flag indicating if data is currently being loaded.
 * @property {Array} initialState.orders - An array holding the current list of orders.
 * @property {string} initialState.error - A string to hold error messages if any action fails.
 *
 * @property {Function} extraReducers - A function that configures how the state changes in response to actions.
 *
 * The `extraReducers` function handles:
 *
 */
const ordersSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /**
       * Handles the pending state of the `getInitialOrders` thunk.
       * Sets `loading` to `true` when the fetch operation for initial orders starts.
       *
       * @param {Object} state - The current slice state.
       */
      .addCase(getInitialOrders.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state of the `getInitialOrders` thunk.
       * Updates `orders` with the fetched data and sets `loading` to `false` upon success.
       *
       * @param {Object} state - The current slice state.
       * @param {Object} action - The action object containing the payload with fetched orders.
       */
      .addCase(getInitialOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload && [...action.payload];
      })
      /**
       * Handles the rejected state of the `getInitialOrders` thunk.
       * Sets `loading` to `false` and updates `error` with the error message if the fetch fails.
       *
       * @param {Object} state - The current slice state.
       * @param {Object} action - The action object containing the error message.
       */
      .addCase(getInitialOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /**
       * Handles the pending state of the `addOrder` thunk.
       * Sets `loading` to `true` when the order addition operation starts.
       *
       * @param {Object} state - The current slice state.
       */
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      /**
       * Handles the fulfilled state of the `addOrder` thunk.
       * Sets `loading` to `false` upon successful addition of the order.
       *
       * @param {Object} state - The current slice state.
       */
      .addCase(addOrder.fulfilled, (state) => {
        state.loading = false;
      })
      /**
       * Handles the rejected state of the `addOrder` thunk.
       * Sets `loading` to `false` and updates `error` with the error message if adding the order fails.
       *
       * @param {Object} state - The current slice state.
       * @param {Object} action - The action object containing the error message.
       */
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

/**
 * The reducer function for managing the state of orders.
 * This is generated from the `ordersSlice` and is used to handle actions related to orders.
 *
 * @type {Reducer}
 */
export const ordersReducer = ordersSlice.reducer;

/**
 * Selector function for accessing order-related state from the Redux store.
 *
 * @param {Object} state - The global state object of the Redux store.
 * @returns {Object} An object containing the current state of orders, including:
 *   - `loading`: A boolean indicating if the state is currently loading.
 *   - `error`: Any error message related to orders.
 *   - `orders`: The list of orders.
 */
export const ordersSelector = (state) => ({
  loading: state.ordersReducer.loading,
  error: state.ordersReducer.error,
  orders: state.ordersReducer.orders,
});
